import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, map, pluck } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { DataService } from '../../../../common/services/data.service';
import { Student, Subject, SubjectStudent } from '../../../../common/entities';
import { TableOptions } from '../../../../shared/components/table/models';
import { IStandardTable, ITableHeader } from '../../../../shared/components/table/interfaces';
import { IMark, ISubjectStudent } from '../../../../common/interfaces';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-subject-journal',
  templateUrl: './subject-journal.component.html',
  styleUrls: ['./subject-journal.component.sass']
})
export class SubjectJournalComponent implements OnInit {

  private subject: Subject;
  private subjectTableHeaders: Array<ITableHeader> = [
    { label: 'Name', property: 'firstName', isDisableEdit: true, isDisableDelete: true, isEditColumnData: false},
    { label: 'Last Name', property: 'lastName', isDisableEdit: true, isDisableDelete: true, isEditColumnData: false },
    { label: 'Average mark', property: 'averageMark', isDisableEdit: true, isDisableDelete: true, isEditColumnData: false}
  ];
  private subjectTableClass: string = 'subject';

  public subjectTableOptions: TableOptions;
  public subjectTableView: Array<object>;
  public studentList: Array<Student>;
  public studentsListForAdd: FormControl = new FormControl();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  private getSubjectTableDates (subject: Subject): Array<ITableHeader> {
    let tableHeaderDates: Array<ITableHeader> = [];

    if (!subject.dates || subject.dates.length === 0 ) {
      return tableHeaderDates;
    }

    tableHeaderDates = subject.dates.map( (data: string) => {
      return {
               label: data, property: data, isEditColumnData: true
             };
      }
    );

    return tableHeaderDates;
  }

  private createStudentInfo(student: ISubjectStudent): Observable<object> {

    const subjectTableRow: any = {
      id: null,
      firstName: '',
      lastName: '',
      averageMark: null,
    };

    return this.dataService.getStudent(student.id)
      .pipe(
        map(
          data => {
            subjectTableRow.lastName = data.lastName;
            subjectTableRow.firstName = data.firstName;
            subjectTableRow.id = student.id;

            if (student.marks.length !== 0) {

              let marksSum: Array<number> = [];

              student.marks.forEach((mark) => {
                if (this.subject.dates.includes(mark.date)) {
                  marksSum.push(+mark.value);
                  subjectTableRow[mark.date] = `${mark.value}`;
                }
              });

              if (marksSum.length !== 0) {
                subjectTableRow.averageMark = marksSum.reduce((acc, item) => acc + item) / marksSum.length;
              }
            }
            return subjectTableRow;
          }
        )
      );
  }

  private createSubjectTableRow(students: Array<ISubjectStudent>): Observable<Array<object>> {
      if (!students || students.length === 0) {
        return of([]);
      }
      return forkJoin(
        students.map(
          (student: ISubjectStudent) => this.createStudentInfo(student)
        )
      );
  }

  public addStudents(): void {
    let selectedStudent: Array<number>;

    if (!this.studentsListForAdd.valid) {
      return;
    }

    selectedStudent = this.studentsListForAdd.value;

    const newStudentsArr: Array<ISubjectStudent> = selectedStudent.map(studentId => {
      return new SubjectStudent(studentId);
    });

    const newSubjectStudents: Array<ISubjectStudent> = this.subject.students.concat(newStudentsArr);

    const newSubject: Subject = {...this.subject, students: newSubjectStudents};

    this.dataService.updateSubject(newSubject)
      .subscribe(
        () => this.router.navigate[`/subject/${newSubject.id}`],
        err => console.log(err)
      );
  }

  public checkStudentInSubject(studentId: number): boolean {
    return !!_.find(this.subject.students, (student) => student.id === studentId);
  }

  public ngOnInit(): void {
    this.route.data.pipe(delay(400), pluck('subject'))
      .subscribe(
        data => {
          this.subject = { ...data };

          const datesTableHeaders: Array<ITableHeader> = this.getSubjectTableDates(this.subject);
          this.subjectTableHeaders = this.subjectTableHeaders.concat(datesTableHeaders);
          const tableOptions: TableOptions = {
            tableHeaders: this.subjectTableHeaders,
            tableClass: this.subjectTableClass,
            highLightOptions: {
              isEnable: true,
              middleValue: 8,
              compareCellClass: 'averageMark',
              moreAndEqualValueColor: 'lightgreen',
              lessValueColor: 'lightblue',
            },
            isEditData: true,
            isAddColumn: true,
            isSearchField: true,
            validationPatternHeaders: ['^\\d{2}\\.\\d{2}$'],
            validationPatternData: ['^\\d{1,2}$|^.{0}$'],
            isRemoveData: true,
          };

          this.subjectTableOptions = new TableOptions(tableOptions);

          this.createSubjectTableRow(this.subject.students)
            .subscribe(
              res => this.subjectTableView = [...res],
              err => console.log(err),
            );
        },
      );

    this.dataService.getStudents()
      .subscribe(
        data => {
          this.studentList = data;
        },
        err => console.log(err)
      );
  }

  public saveData(data: IStandardTable): void {
    const subjectDates: Array<string> = data.tableDisplayCols.filter(col => !isNaN(parseInt(col, 10)));
    const subjectStudents: Array<ISubjectStudent> = data.tableData.map(student => {
      const id: number = student.id;
      const marks: Array<IMark> = subjectDates.filter(date => !!student[date]).map(date => ({date: date, value: student[date]}));
      return {
        id,
        marks,
      };
    });
    const newSubject: Subject = {...this.subject, dates: subjectDates, students: subjectStudents};

    this.dataService.updateSubject(newSubject)
      .subscribe(
      () => this.router.navigate[`/subject/${newSubject.id}`],
      err => console.log(err)
    );
  }

}

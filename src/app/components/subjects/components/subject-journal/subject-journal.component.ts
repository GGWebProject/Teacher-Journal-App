import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { delay, map, pluck } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from '../../../../common/services/data.service';
import { Subject } from '../../../../common/entities';
import { TableOptions } from '../../../../shared/components/table/models/table-options';
import { IStandardTable, ITableHeader } from '../../../../shared/components/table/interfaces';
import {IMark, ISubjectStudent} from '../../../../common/interfaces';

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

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  private getSubjectTableDates (subject: Subject): Array<ITableHeader> {
    let tableHeaderDates: Array<ITableHeader> = [];

    if (subject.dates.length === 0) {
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
      return forkJoin(
        students.map(
          (student: ISubjectStudent) => this.createStudentInfo(student)
        )
      );
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
          };

          this.subjectTableOptions = new TableOptions(tableOptions);

          this.createSubjectTableRow(this.subject.students)
            .subscribe(
              res => this.subjectTableView = [...res],
            );
        },
      );
  }

  public saveData(data: IStandardTable): void {
    console.log(data);
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

    this.dataService.updateSubjectJournal(newSubject)
      .subscribe(
      () => this.router.navigate[`/subject/${newSubject.id}`],
      err => console.log(err)
    );
  }

}

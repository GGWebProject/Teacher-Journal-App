import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../common/services/data.service';
import {map, pluck} from 'rxjs/operators';
import { Subject } from '../../../../common/entities';
import { TableOptions } from '../../../../shared/components/table/models/table-options';
import { ITableHeader } from '../../../../shared/components/table/interfaces/itable-header';
import { ISubjectStudent } from '../../../../common/interfaces';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-subject-journal',
  templateUrl: './subject-journal.component.html',
  styleUrls: ['./subject-journal.component.sass']
})
export class SubjectJournalComponent implements OnInit {

  private subject: Subject;
  private subjectTableHeaders: Array<ITableHeader> = [
    { label: 'Name', property: 'firstName' },
    { label: 'Last Name', property: 'lastName' },
    { label: 'Average mark', property: 'averageMark' }
  ];
  private subjectTableClass: string = 'subject';

  public subjectTableOptions: TableOptions;
  public subjectTableView: Array<object> = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {}

  private getSubjectTableDates (subject: Subject): Array<ITableHeader> {
    let tableHeaderDates: Array<ITableHeader> = [];

    if (subject.dates.length === 0) {
      return tableHeaderDates;
    }

    tableHeaderDates = subject.dates.map( (date: string) => { return { label: date.slice(0, date.lastIndexOf('.')), property: date}; });

    return tableHeaderDates;
  }

  private createSubjectTableRow(student: ISubjectStudent): Observable<object> {

    const subjectTableRow: any = {
      id: undefined,
      firstName: '',
      lastName: '',
      averageMark: undefined,
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
                if (this.subject.dates.includes(mark.data)) {
                  marksSum.push(mark.value);
                  subjectTableRow[mark.data] = mark.value;
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

  public ngOnInit(): void {
    this.route.data.pipe(pluck('subject'))
      .subscribe(
        data => {
          this.subject = { ...data };

          const datesTableHeaders: Array<ITableHeader> = this.getSubjectTableDates(this.subject);
          this.subjectTableHeaders = this.subjectTableHeaders.concat(datesTableHeaders);
          const tableOptions: TableOptions = {
            tableHeaders: this.subjectTableHeaders,
            tableClass: this.subjectTableClass,
            isEditData: true,
            isRemoveData: true,
          };

          this.subjectTableOptions = new TableOptions(tableOptions);
          this.subjectTableView = [];

          this.subject.students.forEach(
            (student: ISubjectStudent) => {
              this.createSubjectTableRow(student)
                .subscribe(row => this.subjectTableView.push(row));
            }
          );
        },
      );
  }

}

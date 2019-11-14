import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, forkJoin, Observable } from 'rxjs';
import { Student } from '../../../../common/entities';
import { DataService } from '../../../../common/services/data.service';
import '../../../../../../db/db.json';
import { ITableHeader, IStandardTable, TableOptions } from '../../../../shared/components/table';
import * as _ from 'lodash';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.sass']
})

export class StudentsListComponent implements OnInit {

  private studentsList$: Observable<Array<Student>>;
  private studentTableHeaders: Array<ITableHeader> = [
      {label: 'Id', property: 'id', isDisableEdit: true, isDisableDelete: true, isEditColumnData: false},
      {label: 'Name', property: 'firstName', isDisableEdit: true, isDisableDelete: true, isEditColumnData: true},
      {label: 'Last Name', property: 'lastName', isDisableEdit: true, isDisableDelete: true, isEditColumnData: true},
      {label: 'Address', property: 'address', isDisableEdit: true, isDisableDelete: true, isEditColumnData: true},
      {label: 'Description', property: 'description', isDisableEdit: true, isDisableDelete: true, isEditColumnData: true}
    ];
  private studentTableClass: string = 'students';

  public studentsTableOptions: TableOptions;
  public studentsTableView: Array<Student>;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  private compareStudentsArrays(newArr: Array<Student>, oldArr: Array<Student>): Array<Student> {
    return newArr.filter(newStud => {
      const equalOldStud: Student = oldArr.find(oldStud => oldStud.id === newStud.id);
      return !_.isEqual(newStud, equalOldStud);
    });
  }

  private foundDeletedStudent(newArr: Array<Student>, oldArr: Array<Student>): Array<Student> {
    if (newArr.length === oldArr.length) {
      return [];
    }

    return oldArr.filter(oldStud => !newArr.find(newStud => newStud.id === oldStud.id));
  }

  private deleteStudents(students: Array<Student>): Observable<Array<{}>> {
    // need make one request to server, but request, like this localhost/students/1,2,3,4 - doesn't work
    return forkJoin(
      students.map(
        (student: Student) => this.dataService.deleteStudent(student)
      )
    );
  }

  private updateStudents(students: Array<Student>): Observable<Array<Student | void>> {
    return forkJoin(
      students.map(
        (student: Student) => this.dataService.updateStudent(student)
      )
    );
  }

  public onCreateStudent(): void {
    const link: Array<string> = ['/students/add'];
    this.router.navigate(link);
  }

  public ngOnInit(): void {
    const tableOptions: TableOptions = {
      tableHeaders: this.studentTableHeaders,
      tableClass: this.studentTableClass,
      isEditData: true,
      isSearchField: true,
      validationPatternData: ['\.+'],
      isRemoveData: true,
    };
    this.studentsTableOptions = new TableOptions(tableOptions);
    this.studentsList$ = this.dataService.getStudents();
    this.studentsList$.subscribe(
      data => {
        this.studentsTableView = [...data];
      },
      err => console.log(err),
    );
  }

  public saveData(data: IStandardTable): void {
    const newStudents: Array<Student> = data.tableData;
    const deletedStudents: Array<Student> = this.foundDeletedStudent(newStudents, this.studentsTableView);
    const changedStudent: Array<Student> = this.compareStudentsArrays(newStudents, this.studentsTableView);

    concat(this.updateStudents(changedStudent), this.deleteStudents(deletedStudents))
      .subscribe(
        () => this.router.navigate['/students'],
        err => console.log(err)
      );
  }
}

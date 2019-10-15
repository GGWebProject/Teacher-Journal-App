import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../../../common/entities';
import { DataService } from '../../../../common/services/data.service';
import '../../../../../../db/db.json';
import { ITableHeader } from '../../../../shared/components/table/interfaces/itable-header';
import { TableOptions } from '../../../../shared/components/table/models/table-options';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.sass']
})

export class StudentsListComponent implements OnInit {

  private studentsList$: Observable<Array<Student>>;
  private studentTableHeaders: Array<ITableHeader> = [
      {label: 'Id', property: 'id'},
      {label: 'Name', property: 'firstName'},
      {label: 'Last Name', property: 'lastName'},
      {label: 'Address', property: 'address'},
      {label: 'Description', property: 'description'}
    ];
  private studentTableClass: string = 'students';

  public studentsTableOptions: TableOptions;
  public studentsTableView: Array<Student>;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  public onCreateStudent(): void {
    const link: Array<string> = ['/students/add'];
    this.router.navigate(link);
  }

  public ngOnInit(): void {
    this.studentsTableOptions = new TableOptions(this.studentTableHeaders, this.studentTableClass);
    this.studentsList$ = this.dataService.getStudents();
    this.studentsList$.subscribe(
      data => {
        this.studentsTableView = [...data];
      },
      err => console.log(err),
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../../../common/entities';
import { DataService } from '../../../../common/services/data.service';
import '../../../../../../db/db.json';
import { StudentListOptions } from './students-list.options';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.sass']
})

export class StudentsListComponent implements OnInit {
  public studentsListOptions: StudentListOptions;
  public studentsList: Array<Student>;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  public onCreateStudent(): void {
    const link: Array<string> = ['/students/add'];
    this.router.navigate(link);
  }

  public ngOnInit(): void {
    this.dataService
      .getStudents()
      .subscribe(
      students => (this.studentsList = [...students]),
      err => console.log(err),
    );
    this.studentsListOptions = new StudentListOptions(this.studentsList);
    console.log(this.studentsListOptions);
  }
}

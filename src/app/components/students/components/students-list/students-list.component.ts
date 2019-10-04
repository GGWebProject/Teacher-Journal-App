import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';

import '../../../../../../db/db.json';

import {Student} from '../../../../common/entities';
import {StudentsService} from '../../services/students.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.sass']
})

export class StudentsListComponent implements OnInit {

  public studentsList$: Observable<Array<Student>>;

  constructor(
    private studentsService: StudentsService,
    private router: Router,
  ) {}

  public onCreateStudent(): void {
    const link: Array<string> = ['/students/add'];
    this.router.navigate(link);
  }

  public ngOnInit(): void {
    this.studentsList$ = this.studentsService.getStudents();
  }
}

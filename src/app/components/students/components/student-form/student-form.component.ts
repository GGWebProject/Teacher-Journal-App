import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {Student} from '../../../../common/entities';
import {StudentsService} from '../../services/students.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent {

  private student: Student;

  public student$: Observable<Array<Student>>;

  constructor(
    private location: Location,
    private studentsService: StudentsService,
  ) { }

  public onSaveForm(form: NgForm): void {
    this.student = { ...form.value, id: undefined };
    this.studentsService.saveStudent(this.student);
      // .subscribe();
    this.location.back();
  }

}

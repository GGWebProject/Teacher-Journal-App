import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
// import { Observable } from 'rxjs';
import { Student } from '../../../../common/entities';
import { DataService } from '../../../../common/services/data.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent {

  private student: Student;

  // public student$: Observable<Array<Student>>;

  constructor(
    private location: Location,
    private dataService: DataService,
  ) { }

  public onSaveForm(form: NgForm): void {
    this.student = { id: undefined, ...form.value };
    this.dataService.saveStudent(this.student);
      // .subscribe();
    this.location.back();
  }

}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Student } from '../../../../common/entities';
import { DataService } from '../../../../common/services/data.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent {

  private student: Student;

  constructor(
    private location: Location,
    private dataService: DataService,
  ) { }

  public onSaveForm(form: NgForm): void {
    this.student = { id: undefined, ...form.value };
    this.dataService.saveStudent(this.student);
    this.location.back();
  }

}

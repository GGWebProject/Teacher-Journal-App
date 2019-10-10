import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Student } from '../../../../common/entities';
import { DataService } from '../../../../common/services/data.service';
import { ICanComponentDeactivate } from '../../../../common/interfaces/ican-component-deactivate';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})

export class StudentFormComponent implements ICanComponentDeactivate {

  private student: Student;

  @ViewChild('studentFormComponent', { static: false }) public studentFormComponent: NgForm;

  constructor(
    private location: Location,
    private dataService: DataService,
  ) { }

  public onSaveForm(form: NgForm): void {
    this.student = { id: undefined, ...form.value };
    this.dataService.saveStudent(this.student)
      .subscribe(
        () => this.location.back(),
        err => console.log(err)
      );
  }

  public canDeactivate(): boolean {
    return !this.studentFormComponent.form.dirty || window.confirm('You didn`t save the student. Are you sure you want to exit?');
  }

}

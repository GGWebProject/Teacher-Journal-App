import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// import {Router} from '@angular/router';

import { Student, Subject } from '../../../common/entities';

@Component({
  selector: 'app-shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})

export class FormComponent implements OnInit {

  @Input() public entity: string;
  @Input() public submitButtonText: string;

  @Output() public savedStudent: EventEmitter<Student> = new EventEmitter<Student>();

  public isStudent: boolean;

  constructor(
    // private router: Router
  ) {}

  public ngOnInit(): void {
    this.isStudent = this.entity === 'student';
  }

  public onSaveForm(): void {
    console.log('Save form');

    // this.savedStudent.emit();
    // const backUrl: string = this.isStudent ? '/students' : '/subjects';
    // this.router.navigate([backUrl]);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.sass']
})
export class StudentFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public saveStudent(): void {
    console.log('save');
  }

}

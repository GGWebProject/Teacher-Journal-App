import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import {SubjectListComponent} from './subject-list/subject-list.component';

@NgModule({
  declarations: [ SubjectListComponent ],
  imports: [
    CommonModule,
    SubjectsRoutingModule
  ]
})
export class SubjectsModule { }

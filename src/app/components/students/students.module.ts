import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  StudentsListComponent, StudentFormComponent, StudentPageComponent
} from './components';
import {FormComponent} from '../../shared/components';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsServicesModule } from './students-services.module';

@NgModule({
  declarations: [ StudentsListComponent,  StudentFormComponent, StudentPageComponent, FormComponent],
  imports: [
    CommonModule,
    FormsModule,
    StudentsServicesModule,
    StudentsRoutingModule,
  ]
})
export class StudentsModule { }

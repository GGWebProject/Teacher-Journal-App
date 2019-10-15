import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  StudentsListComponent, StudentFormComponent, StudentPageComponent
} from './components';
import { StudentsComponent } from './students.component';
import { FormComponent, TableComponent } from '../../shared/components';
import { StudentsRoutingModule } from './students-routing.module';
import { MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
            declarations: [
              StudentsListComponent,
              StudentFormComponent,
              StudentPageComponent,
              FormComponent,
              TableComponent,
              StudentsComponent,
            ],
            exports: [
              TableComponent
            ],
            imports: [
              CommonModule,
              FormsModule,
              StudentsRoutingModule,
              MatTableModule,
              MatSortModule,
            ]
          })
export class StudentsModule { }

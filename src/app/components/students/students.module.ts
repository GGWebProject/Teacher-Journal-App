import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  StudentsListComponent, StudentFormComponent, StudentPageComponent
} from './components';
import { StudentsComponent } from './students.component';
import { FormComponent, TableComponent } from '../../shared/components';
import { StudentsRoutingModule } from './students-routing.module';
import {
  MatButtonModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {HighLightDirective} from '../../shared/components/table/directives/hight-light.directive';
import {HeaderEditDirective} from '../../shared/components/table/directives/header-edit.directive';
import {DataEditDirective} from '../../shared/components/table/directives/data-edit.directive';

@NgModule({
            declarations: [
              StudentsListComponent,
              StudentFormComponent,
              StudentPageComponent,
              FormComponent,
              TableComponent,
              StudentsComponent,
              HighLightDirective,
              HeaderEditDirective,
              DataEditDirective,
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
              MatFormFieldModule,
              MatInputModule,
              MatProgressSpinnerModule,
              MatButtonModule,
              MatIconModule,
            ]
          })
export class StudentsModule { }

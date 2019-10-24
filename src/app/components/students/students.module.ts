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
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import { HighLightDirective, TableDataEditDirective } from '../../shared/components/table';

@NgModule({
            declarations: [
              StudentsListComponent,
              StudentFormComponent,
              StudentPageComponent,
              FormComponent,
              TableComponent,
              StudentsComponent,
              HighLightDirective,
              TableDataEditDirective,
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
              MatTooltipModule,
            ]
          })
export class StudentsModule { }

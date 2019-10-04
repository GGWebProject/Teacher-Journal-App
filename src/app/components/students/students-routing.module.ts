import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import {ExportComponent} from '..';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsListComponent,
    // children: [
    //   {
    //     path: 'add',
    //     component: StudentFormComponent,
    //   },
    // ]
  },
  {
    path: 'students/add',
    component: StudentFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {
}

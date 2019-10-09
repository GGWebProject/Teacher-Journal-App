import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsListComponent, StudentFormComponent } from './components';
import { StudentsComponent } from './students.component';

const studentsRoutes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    children: [
      {
        path: '',
        component: StudentsListComponent,
        pathMatch: 'full',
        data: {
          breadcrumb: 'students'
        }
      },
      {
        path: 'add',
        component: StudentFormComponent,
        data: {
          breadcrumb: 'add student'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(studentsRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {
}

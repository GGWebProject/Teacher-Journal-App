import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsListComponent, StudentFormComponent } from './components';
import { StudentsComponent } from './students.component';
import { CanDeactivateGuard } from '../../common/guards/can-diactivate.guard';

const studentsRoutes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    data: {
      breadcrumb: 'students'
    },
    children: [
      {
        path: '',
        component: StudentsListComponent,
        pathMatch: 'full',
      },
      {
        path: 'add',
        component: StudentFormComponent,
        data: {
          breadcrumb: 'add student'
        },
        canDeactivate: [CanDeactivateGuard]
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

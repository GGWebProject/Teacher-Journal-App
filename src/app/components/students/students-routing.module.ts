import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsListComponent,
    // children: [
    //   {
    //     path: 'add',
    //     component: StudentsListComponent
    //   },
    //   {
    //     path: 'edit/:studentID',
    //     redirectTo: 'students',
    //     // component: UserFormComponent,
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }

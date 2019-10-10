import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectListComponent } from './components/subject-list/subject-list.component';

const routes: Routes = [
  {
    path: 'subjects',
    component: SubjectListComponent,
    data: {
      breadcrumb: 'subjects'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }

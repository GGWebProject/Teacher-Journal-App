import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects.component';
import { SubjectFormComponent, SubjectJournalComponent, SubjectsListComponent } from './components';

const routes: Routes = [
  {
    path: 'subjects',
    component: SubjectsComponent,
    data: {
      breadcrumb: 'subjects'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SubjectsListComponent,
      },
      {
        path: 'subject/:subjectId',
        component: SubjectJournalComponent,
        data: {
          breadcrumb: 'Journal'
        },
      },
      {
        path: 'add',
        component: SubjectFormComponent,
        data: {
          breadcrumb: 'Add subject'
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }

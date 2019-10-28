import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects.component';
import { SubjectFormComponent, SubjectJournalComponent, SubjectsListComponent } from './components';
import { SubjectResolveGuard } from './guards/subject-resolve.guard';
import {CanDeactivateGuard} from '../../common/guards/can-diactivate.guard';

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
        resolve: {
          subject: SubjectResolveGuard,
        }
      },
      {
        path: 'add',
        component: SubjectFormComponent,
        data: {
          breadcrumb: 'Add subject'
        },
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'subject/:subjectId/edit',
        component: SubjectFormComponent,
        data: {
          breadcrumb: 'Edit subject'
        },
        resolve: {
          subject: SubjectResolveGuard,
        },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }

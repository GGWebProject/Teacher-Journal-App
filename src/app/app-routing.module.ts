import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExportComponent, NotFoundComponent} from './components';

const routes: Routes = [
  {
    path: 'export',
    component: ExportComponent
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

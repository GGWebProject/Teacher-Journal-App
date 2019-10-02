import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './root/app.component';
import { NavigationComponent } from './shared/components';
import { ExportComponent } from './components';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StudentsModule } from './components/students/students.module';
import { SubjectsModule } from './components/subjects/subjects.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ExportComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StudentsModule,
    SubjectsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor (
    router: Router
  ) {
    // show router config
    const replacer: any = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

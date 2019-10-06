import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './root/app.component';
import { NavigationComponent } from './shared/components';
import { ExportComponent, NotFoundComponent } from './components';

import { StudentsModule } from './components/students/students.module';
import { SubjectsModule } from './components/subjects/subjects.module';

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
              AppRoutingModule,
            ],
            providers: [],
            exports: [],
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

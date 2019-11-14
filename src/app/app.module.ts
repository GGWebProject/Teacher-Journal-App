import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './root/app.component';
import { NavigationComponent, BreadcrumbsComponent } from './shared/components';
import { ExportComponent, NotFoundComponent } from './components';

import { StudentsModule } from './components/students/students.module';
import { SubjectsModule } from './components/subjects/subjects.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StudentsEffect } from './store';

@NgModule({
            declarations: [
              AppComponent,
              NavigationComponent,
              ExportComponent,
              NotFoundComponent,
              BreadcrumbsComponent,
            ],
            imports: [
              BrowserModule,
              HttpClientModule,
              StudentsModule,
              SubjectsModule,
              AppRoutingModule,
              BrowserAnimationsModule,
              StoreModule.forRoot(reducers, {
                metaReducers,
                runtimeChecks: {
                  strictStateImmutability: true,
                  strictActionImmutability: true
                }
              }),
              StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
              EffectsModule.forRoot([AppEffects, StudentsEffect]),
            ],
            providers: [],
            exports: [
            ],
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

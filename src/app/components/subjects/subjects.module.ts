import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsListComponent, SubjectFormComponent, SubjectJournalComponent } from './components';
import { SubjectsComponent } from './subjects.component';

@NgModule({
  declarations: [ SubjectsListComponent, SubjectFormComponent, SubjectJournalComponent, SubjectsComponent ],
  providers: [],
  imports: [
    CommonModule,
    SubjectsRoutingModule
  ]
})
export class SubjectsModule { }

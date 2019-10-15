import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsListComponent, SubjectFormComponent, SubjectJournalComponent } from './components';
import { SubjectsComponent } from './subjects.component';
import { SubjectResolveGuard } from './guards/subject-resolve.guard';
import {StudentsModule} from '../students/students.module';

@NgModule({
  declarations: [ SubjectsListComponent, SubjectFormComponent, SubjectJournalComponent, SubjectsComponent ],
  providers: [ SubjectResolveGuard ],
            imports: [
              CommonModule,
              SubjectsRoutingModule,
              StudentsModule
            ]
          })
export class SubjectsModule { }

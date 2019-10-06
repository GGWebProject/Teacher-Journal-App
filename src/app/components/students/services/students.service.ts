import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StudentsServicesModule } from '../students-services.module';
import {Student} from '../../../common/entities';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';

@Injectable({
  providedIn: StudentsServicesModule
})

export class StudentsService {

  private studentsUrl: string = 'http://localhost:3000/students';

  constructor(
    private http: HttpClient,
  ) {}

  public getStudents(): Observable<Array<Student>> {
    return this.http.get<Array<Student>>(this.studentsUrl)
      .pipe(
        retry(3),
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }
}

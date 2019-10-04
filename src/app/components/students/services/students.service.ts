import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
    return this.http
      .get<Array<Student>>(this.studentsUrl)
      .pipe(
        retry(3),
        tap(
          data => console.log(data),
          error => console.log(error),
        )
      );
  }

  public saveStudent(student: Student): Promise<void | Student> {

    const body: string = JSON.stringify({...student});
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    console.log(body, student);
    return this.http
      .post<Student>(this.studentsUrl, body, options)
      // .pipe(
      //   retry(3),
      //   tap(
      //     data => console.log(data),
      //     error => console.log(error),
      //   )
      // );
      .toPromise()
      .then(resp => resp as Student)
      .catch(err => console.log(err));
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Student } from '../entities';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private studentsUrl: string = 'http://localhost:3000/students';

  constructor(
    private http: HttpClient,
  ) {}

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      console.error(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }

  public getStudents(): Observable<Array<Student>> {
    return this.http
      .get<Array<Student>>(this.studentsUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public saveStudent(student: Student): Observable<Student | void> {

    const body: string = JSON.stringify({...student});
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<Student>(this.studentsUrl, body, options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
}

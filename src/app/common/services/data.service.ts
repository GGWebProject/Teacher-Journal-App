import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Student, Subject, SubjectList } from '../entities';
import {catchError, retry, tap, map, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private studentsUrl: string = 'http://localhost:3000/students';
  private subjectsUrl: string = 'http://localhost:3000/subjects';

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

  private getSubjects(): Observable<Array<Subject>> {
    return this.http
      .get<Array<Subject>>(this.subjectsUrl)
      .pipe(
        retry(3),
        tap(
          data => console.log(data),
          err => console.log(err)
        ),
        catchError(this.handleError)
      );
  }

  public getSubjectsList(): Observable<Array<SubjectList>> {
    return this.getSubjects().pipe(
      map((subjects: Array<SubjectList>) => subjects.map(subject => new SubjectList(subject.id, subject.name, subject.description))),
      catchError(this.handleError)
    );
  }

  public getSubject(id: number): Observable<SubjectList> {
    return this.getSubjects().pipe(
      map((subjects: Array<SubjectList>) => subjects.find(subject => subject.id === id)),
      catchError(this.handleError)
    );
  }

  public getStudents(): Observable<Array<Student>> {
    return this.http
      .get<Array<Student>>(this.studentsUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public getStudent(id: number): Observable<Student> {
    return this.getStudents().pipe(
      map((students: Array<Student>) => students.find(student => student.id === id)),
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { concat, forkJoin, Observable, of, throwError } from 'rxjs';
import { Student, Subject, SubjectList } from '../entities';
import { catchError, retry, tap, map, delay, filter, concatMap, exhaustMap } from 'rxjs/operators';
import { ISubjectStudent } from '../interfaces';

const studentsUrl: string = 'http://localhost:3000/students';
const subjectsUrl: string = 'http://localhost:3000/subjects';

@Injectable({
  providedIn: 'root'
})

export class DataService {

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
      .get<Array<Subject>>(subjectsUrl)
      .pipe(
        retry(3),
        tap(
          data => console.log(data),
          err => console.log(err)
        ),
        catchError(this.handleError)
      );
  }

  private removeStudentFromSubject(student: Student): Observable<Array<Subject | void>> {
    return this.getSubjects()
      .pipe(
        map(
          (subjects: Array<Subject>) =>
            subjects
              // subjects that contain student
              .filter(
                (subject: Subject) =>
                  subject.students.find((_stud: ISubjectStudent) => _stud.id === student.id)
              )
              // remove student from subjects
              .map(
                (subject: Subject) => {
                  subject.students = subject.students.filter((_stud: ISubjectStudent) => _stud.id !== student.id);
                  return subject;
                }
              )
        )
      )
      // update subjects
      .pipe(
        tap(
          data => console.log(data),
        ),
        exhaustMap((subjects) => {
          return forkJoin(
            subjects.map(
              (subject: Subject) => this.updateSubject(subject)
            )
          );
        })
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

  public updateSubject(subject: Subject): Observable<Subject | void> {
    const body: string = JSON.stringify({...subject});
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<Subject>(`${subjectsUrl}/${subject.id}`, body, options)
      .pipe(
        retry(3),
        tap(_ => console.log(`updated Subject id=${subject.id}`)),
        catchError(this.handleError)
      );
  }

  public saveSubject(subject: Subject): Observable<Subject | void> {
    const body: string = JSON.stringify({...subject});
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .post<Subject>(subjectsUrl, body, options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public deleteSubject(subjectId: number): Observable<{}> {
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete(`${subjectsUrl}/${subjectId}`, options).pipe(
      catchError(this.handleError)
    );
  }

  public getStudents(): Observable<Array<Student>> {
    return this.http
      .get<Array<Student>>(studentsUrl)
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
      .post<Student>(studentsUrl, body, options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public updateStudent(student: Student): Observable<Student | void> {
    const body: string = JSON.stringify({...student});
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put<Student>(`${studentsUrl}/${student.id}`, body, options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public deleteStudent(student: Student): Observable<{}> {
    const options: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const removedStudentsFromSubjects$: Observable<Array<Subject | void>> = this.removeStudentFromSubject(student);
    const removedStudentFromList$: Observable<{}> = this.http.delete(`${studentsUrl}/${student.id}`, options).pipe(
      catchError(this.handleError)
    );

    return concat(removedStudentsFromSubjects$, removedStudentFromList$);
  }
}

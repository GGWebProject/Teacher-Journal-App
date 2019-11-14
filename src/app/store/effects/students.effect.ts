import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as studentsActions from '../actions/students.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DataService } from '../../common/services/data.service';
import { Student } from '../../common/entities';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { of } from 'rxjs';

@Injectable()
export class StudentsEffect {

  public loadStudents$: any = createEffect(() =>
    this.actions$.pipe(
      ofType(studentsActions.studentsLoad),
      switchMap(
        () => this.dataService.getStudents()
          .pipe(
            map((students: Array<Student>) => studentsActions.studentsLoadSuccess({students})),
            catchError(() => of(studentsActions.studentsLoadFail()))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<fromStore.IState>
  ) {}
}

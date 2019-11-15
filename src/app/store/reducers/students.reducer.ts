import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IStudentsState } from '../../common/interfaces/istudentsstate';
import * as studentsAction from '../actions/students.action';
import { Student } from '../../common/entities';

const initialState: IStudentsState = {
  students: [],
  studentsLoading: false,
  studentsLoaded: false
};

const studentReducer: ActionReducer<IStudentsState> = createReducer(
  initialState,
  on(studentsAction.studentsLoad, state => ({...state, studentsLoading: true})),
  on(studentsAction.studentsLoadFail, state => ({...state, studentsLoading: false, studentsLoaded: false})),
  on(studentsAction.studentsLoadSuccess, (state, { students } ) => (
    {
      ...state,
      studentsLoading: false,
      studentsLoaded: true,
      students,
    }
  )),
);

export function reducer(state: IStudentsState | undefined, action: Action): IStudentsState {
  return studentReducer(state, action);
}

export const getStudents: any = (state: IStudentsState): Array<Student> => state.students;
export const getStudentsLoadStatus: any = (state: IStudentsState) => ({loaded: state.studentsLoaded, loading: state.studentsLoading});

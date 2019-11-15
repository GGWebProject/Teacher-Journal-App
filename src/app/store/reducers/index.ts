import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { IStudentsState } from '../../common/interfaces/istudentsstate';
import * as studentReducer from './students.reducer';

export interface IState {
  studentsState: IStudentsState;
}

export const reducers: ActionReducerMap<IState> = {
  studentsState: studentReducer.reducer
};

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

const getStudentsState: any = (state: IState): IStudentsState => state.studentsState;

export const getStudents: any = createSelector(getStudentsState, studentReducer.getStudents);
export const getStudentsLoadStatus: any = createSelector(getStudentsState, studentReducer.getStudentsLoadStatus);

import { createAction, props } from '@ngrx/store';
import { Student } from '../../common/entities';

const STUDENTS_LOAD: string = '[Students] Loading';
const STUDENTS_LOAD_FAIL: string = '[Students] Load fail';
const STUDENTS_LOAD_SUCCESS: string = '[Students] Load success';

export const studentsLoad: any = createAction(STUDENTS_LOAD);
export const studentsLoadFail: any = createAction(STUDENTS_LOAD_FAIL);
export const studentsLoadSuccess: any = createAction(STUDENTS_LOAD_SUCCESS, props<{students: Array<Student>}>());

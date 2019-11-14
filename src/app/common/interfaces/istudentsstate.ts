import {Student} from '../entities';

export interface IStudentsState {
  students: Array<Student>;
  studentsLoading: boolean;
  studentsLoaded: boolean;
}

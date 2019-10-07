import { IStudentMark } from '../interfaces';

export class Subject {
  constructor(
    private id: number,
    public name: string,
    public teacher: string,
    public cabiner: number,
    public description: string,
    public students: Array<IStudentMark>
  ){}
}

import { ISubjectStudent } from '../interfaces';

export class Subject {
  constructor(
    public id: number,
    public name: string,
    public teacher: string,
    public cabiner: number,
    public description: string,
    public dates: Array<string>,
    public students: Array<ISubjectStudent>
  ) {}
}

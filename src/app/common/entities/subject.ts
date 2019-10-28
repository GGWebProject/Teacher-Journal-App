import { ISubjectStudent } from '../interfaces';

export class Subject {
  constructor(
    public id: number = null,
    public name: string = '',
    public teacher: string = '',
    public cabinet: string = '',
    public description: string = '',
    public dates: Array<string> = [],
    public students: Array<ISubjectStudent> = [],
  ) {}
}

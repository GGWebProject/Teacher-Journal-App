import { IMark, ISubjectStudent } from '../interfaces';

export class SubjectStudent implements ISubjectStudent {
  constructor(
    public id: number,
    public marks: Array<IMark> = [],
  ) {}
}

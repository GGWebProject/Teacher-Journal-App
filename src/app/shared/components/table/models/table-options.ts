import { ITableHeader } from '../interfaces/itable-header';

export class TableOptions {
  constructor(
    public tableHeaders: Array<ITableHeader>,
    public tableClass: string = ''
  ) {}
}

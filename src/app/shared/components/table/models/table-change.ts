import { ITableChange } from '../interfaces/itable-change';

export class TableChange {
  public row: number;
  public column: number;
  public previousData: number | string;
  public currentData: number | string;

  constructor(props: ITableChange) {
    this.row = props.row;
    this.column = props.column;
    this.previousData = props.previousData;
    this.currentData = props.currentData;
  }
}

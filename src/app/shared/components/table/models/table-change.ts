import { ITableChange } from '../interfaces/itable-change';

export class TableChange {
  public type: string;
  public rowIndex: number | null;
  public columnIndex: number | null;
  public currentValue?: number | string | null = null;
  public tableData: Array<object> | null;
  public tableHeaders: Array<object> | null;
  public tableDisplayCols: Array<string> | null;

  constructor(props: ITableChange) {
    this.type = props.type;
    this.rowIndex = props.rowIndex;
    this.columnIndex = props.columnIndex;
    this.currentValue = props.currentValue;
    this.tableData = props.tableData;
    this.tableHeaders = props.tableHeaders;
    this.tableDisplayCols = props.tableDisplayCols;
  }
}

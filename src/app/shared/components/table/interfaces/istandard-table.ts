import { ITableHeader } from './itable-header';

export interface IStandardTable {
  tableHeaders: Array<ITableHeader>;
  tableData: Array<object>;
  tableDisplayCols: Array<string>;
}

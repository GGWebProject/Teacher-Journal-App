export interface ITableChange {
  // type can be 'tdChange', 'thChange', 'colDelete', 'colCreate', 'firstState'
  type: string;
  rowIndex?: number | null;
  columnIndex?: number | null;
  currentValue?: number | string;
  tableData: Array<object> | null;
  tableHeaders: Array<object> | null;
  tableDisplayCols: Array<string> | null;
}

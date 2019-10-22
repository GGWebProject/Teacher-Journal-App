export interface ITableChange {
  row: number;
  column: number;
  previousData: number | string;
  currentData: number | string;
}

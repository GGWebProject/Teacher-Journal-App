import {ITableHeader} from './itable-header';

export interface ITableOptions {
  tableHeaders: Array<ITableHeader>;
  tableClass: string;
  isEditData?: boolean;
  isRemoveData?: boolean;
  isSearchField?: boolean;
}

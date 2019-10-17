import { ITableHeader } from '../interfaces/itable-header';
import { ITableOptions } from '../interfaces/itable-options';

export class TableOptions {
  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public isAddColumn?: boolean = false;
  public isEditData?: boolean = false;
  public isSearchField?: boolean = false;

  constructor(props: ITableOptions) {
    this.tableHeaders = props.tableHeaders;
    this.tableClass = props.tableClass;
    this.isAddColumn = props.isAddColumn;
    this.isEditData = props.isEditData;
    this.isSearchField = props.isSearchField;
  }
}

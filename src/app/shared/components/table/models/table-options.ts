import { ITableHeader } from '../interfaces/itable-header';
import { ITableOptions } from '../interfaces/itable-options';

export class TableOptions {
  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public isEditData: boolean = false;
  public isRemoveData: boolean = false;

  constructor(props: ITableOptions) {
    this.tableHeaders = props.tableHeaders;
    this.tableClass = props.tableClass;
    this.isEditData = props.isEditData;
    this.isRemoveData = props.isRemoveData;
  }
}

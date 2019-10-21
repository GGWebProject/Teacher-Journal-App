import { ITableHeader, ITableOptions, ITableHighLightOptions } from '../interfaces';

export class TableOptions {
  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public highLightOptions?: ITableHighLightOptions;
  public isAddColumn?: boolean = false;
  public isEditData?: boolean = false;
  public isSearchField?: boolean = false;

  constructor(props: ITableOptions) {
    this.tableHeaders = props.tableHeaders;
    this.tableClass = props.tableClass;
    this.highLightOptions = props.highLightOptions;
    this.isAddColumn = props.isAddColumn;
    this.isEditData = props.isEditData;
    this.isSearchField = props.isSearchField;
  }
}

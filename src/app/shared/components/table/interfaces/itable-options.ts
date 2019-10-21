import { ITableHeader } from './itable-header';
import { ITableHighLightOptions } from './itable-high-light-options';

export interface ITableOptions {
  tableHeaders: Array<ITableHeader>;
  tableClass: string;
  highLightOptions?: ITableHighLightOptions;
  isEditData?: boolean;
  isAddColumn?: boolean;
  isSearchField?: boolean;
}

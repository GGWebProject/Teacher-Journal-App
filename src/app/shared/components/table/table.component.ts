import { Component, Input, OnInit } from '@angular/core';
import { ITableHeader } from '../../../common/interfaces';
import { TableOptions } from './models/table-options';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;

  @Input () public options: TableOptions;
  @Input () public tableView: Array<object>;

  // tslint:disable-next-line:no-empty
  constructor() {}

  public ngOnInit(): void {
    // console.log(this.options, this.tableView);
    this.tableHeaders = this.options.tableHeaders;
    this.tableClass = this.options.tableClass;
  }

}

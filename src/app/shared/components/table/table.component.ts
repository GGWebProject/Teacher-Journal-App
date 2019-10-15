import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITableHeader } from '../../../common/interfaces';
import { TableOptions } from './models/table-options';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public displayedColumns: Array<string>;
  public dataSource: any;

  @Input () public options: TableOptions;
  @Input () public tableView: Array<object>;

  @ViewChild (MatSort, { static : true }) public sort: MatSort;

  // tslint:disable-next-line:no-empty
  constructor() {}

  public ngOnInit(): void {
    this.tableHeaders = this.options.tableHeaders;
    this.tableClass = this.options.tableClass;
    this.displayedColumns = this.tableHeaders.map(header => header.property);

    this.dataSource = new MatTableDataSource(this.tableView);
    this.dataSource.sort = this.sort;
  }

  public getClass(): string {
    let resultClass: string = 'table';
    const { isEditData, isRemoveData } = this.options;
    resultClass = this.tableClass ? `${resultClass} table_${this.tableClass}` : resultClass;
    resultClass = (isEditData || isRemoveData) ? `${resultClass} table_edit` : resultClass;
    return resultClass;
  }

}

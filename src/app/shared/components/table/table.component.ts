import {AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITableHeader } from '../../../common/interfaces';
import { TableOptions } from './models/table-options';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit, AfterViewInit {

  private tempColumnNumb: number = 0;
  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public displayedColumns: Array<string>;
  public columnsToDisplay: Array<string>;
  public dataSource: any;

  @Input () public options: TableOptions;
  @Input () public tableView: Array<object>;

  @ViewChild (MatSort, {static: false}) public sort: MatSort;

  // tslint:disable-next-line:no-empty
  constructor() {}

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnInit(): void {
    this.tableHeaders = this.options.tableHeaders;
    this.tableClass = this.options.tableClass;
    this.displayedColumns = this.tableHeaders.map(header => header.property);
    this.columnsToDisplay = this.displayedColumns.slice();
    this.dataSource = new MatTableDataSource(this.tableView);
  }

  public getClass(): string {
    let resultClass: string = 'table';
    const { isEditData, isRemoveData } = this.options;
    resultClass = this.tableClass ? `${resultClass} table_${this.tableClass}` : resultClass;
    resultClass = (isEditData || isRemoveData) ? `${resultClass} table_edit` : resultClass;
    return resultClass;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onAddColumn(): void {
    const tempNumb: number = this.tempColumnNumb++;
    const tempColumnName: string = `tempColumn${tempNumb}`;
    this.tableHeaders = this.tableHeaders.concat({label: 'column name', property: tempColumnName});
    this.displayedColumns = [...this.displayedColumns, tempColumnName];
  }

  public onEditTableData(event: Event): void {
    console.log('edit', event);
  }

  public onRemoveColumn(ev: Event, columnProp: string): void {
    ev.stopPropagation();
    const tableData: Array<object> = [...this.dataSource.data];
    this.tableHeaders = this.tableHeaders.filter(view => view.property !== columnProp);
    this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== columnProp);
    tableData.forEach(item => delete item[columnProp]);
    this.dataSource = new MatTableDataSource(tableData);
  }

}

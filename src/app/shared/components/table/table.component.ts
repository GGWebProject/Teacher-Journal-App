import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITableHeader } from '../../../common/interfaces';
import { TableOptions } from './models/table-options';
import { MatSort, MatTableDataSource } from '@angular/material';
import {ITableChange} from './interfaces/itable-change';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit, AfterViewInit {

  private tempColumnNumb: number = 0;
  private tableChanges: Array<ITableChange> = [];
  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public displayedColumns: Array<string>;
  public dataSource: any;

  @Input () public options: TableOptions;
  @Input () public tableView: Array<object>;

  @ViewChild (MatSort, {static: false}) public sort: MatSort;

  // tslint:disable-next-line:no-empty
  constructor() {}

  private addChanges(change: ITableChange): void {

  }

  private saveTableData(tableData: Array<object>): void {
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
  }

  private saveTableHeader(colLabel: string, colProp: string = colLabel, currentColProp: string = colProp): void {
    // if include - change header and column, else - create new column;
    // if you change column - 3rd parameter is required

    if (this.displayedColumns.includes(currentColProp)) {
      const oldColIndex: number = this.displayedColumns.indexOf(currentColProp);
      const tableFullHeader: Array<ITableHeader> = [...this.tableHeaders];
      const tableColumnsNames: Array<string> = [...this.displayedColumns];

      tableFullHeader.splice(oldColIndex, 1, {label: colLabel, property: colProp});
      tableColumnsNames.splice(oldColIndex, 1, colProp);

      this.tableHeaders = tableFullHeader;
      this.displayedColumns = tableColumnsNames;
    } else {
      this.tableHeaders = this.tableHeaders.concat({label: colLabel, property: colProp});
      this.displayedColumns = [...this.displayedColumns, colProp];
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnInit(): void {
    this.tableHeaders = this.options.tableHeaders;
    this.tableClass = this.options.tableClass;
    this.displayedColumns = this.tableHeaders.map(header => header.property);
    this.dataSource = new MatTableDataSource(this.tableView);
    console.log(this.dataSource.data);
  }

  public getClass(): string {
    let resultClass: string = 'table';
    const { isEditData } = this.options;
    resultClass = this.tableClass ? `${resultClass} table_${this.tableClass}` : resultClass;
    resultClass = isEditData ? `${resultClass} table_edit` : resultClass;
    return resultClass;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onAddColumn(): void {
    const tempColumnName: string = `tempColumn${this.tempColumnNumb++}`;
    this.saveTableHeader('column name', tempColumnName);
  }

  public onRemoveColumn(ev: Event, columnProp: string): void {
    ev.stopPropagation();
    const tableData: Array<object> = [...this.dataSource.data];
    this.tableHeaders = this.tableHeaders.filter(view => view.property !== columnProp);
    this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== columnProp);
    tableData.forEach(item => delete item[columnProp]);
    this.saveTableData(tableData);
  }

  public changeHeader(header: ITableHeader, ev: Event): void {
    const evTarget: HTMLInputElement  = ev.target as HTMLInputElement;
    const { property: currentColPropName } = header;
    this.saveTableHeader(evTarget.value, evTarget.value, currentColPropName);
  }

  public changeTableData(header: ITableHeader, ev: Event, rowData: Object): void {
    const evTarget: HTMLInputElement  = ev.target as HTMLInputElement;
    const tableData: Array<object> = [...this.dataSource.data];
    const editRowData: Object = {...rowData};
    const tableRowIndex: number = tableData.findIndex(data => JSON.stringify(data) === JSON.stringify(rowData));
    if (evTarget.value) {
      editRowData[header.property] = evTarget.value;
    } else {
      delete editRowData[header.property];
    }
    tableData[tableRowIndex] = editRowData;
    this.saveTableData(tableData);
  }


}

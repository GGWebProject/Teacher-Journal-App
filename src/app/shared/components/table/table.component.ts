import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { IStandardTable, ITableHeader, ITableChange } from './interfaces';
import { TableOptions, TableChange } from './models';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit, AfterViewInit {

  private tempColumnNumb: number = 0;
  private standardTable: IStandardTable = {
    tableHeaders: null,
    tableData: null,
    tableDisplayCols: null,
  };
  protected tableChangeIndex: number = -1;
  protected tableChanges: Array<TableChange> = [];
  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public displayedColumns: Array<string>;
  public dataSource: any;

  @Input() public options: TableOptions;
  @Input() public tableView: Array<object>;
  @Output() public onSaveData?: EventEmitter<IStandardTable> = new EventEmitter<IStandardTable>();

  @ViewChild(MatSort, {static: false}) public sort: MatSort;
  @ViewChild('tableSearchField', {static: false}) public searchField: ElementRef;

  // tslint:disable-next-line:no-empty
  constructor() {}

  private getTableState(index: number): object {
    const { tableHeaders, tableData, tableDisplayCols } = this.tableChanges[index];
    return {
      tableHeaders,
      tableData,
      tableDisplayCols,
    };
  }

  private setChanges(change: ITableChange): void {
    change.tableData = this.dataSource.data.map(data => ({...data}));
    change.tableHeaders = this.tableHeaders.map(header => ({...header}));
    change.tableDisplayCols = [...this.displayedColumns];
    this.tableChanges = this.tableChanges.concat(new TableChange(change));
    this.tableChangeIndex = this.tableChangeIndex === this.tableChanges.length - 2 ?
      this.tableChangeIndex + 1
      :
      this.tableChanges.length - 1;

    if (this.searchField && this.searchField.nativeElement.value) {
      this.applyFilter(this.searchField.nativeElement.value);
    }
  }

  get isTableChange(): boolean {
    const currentTableState: IStandardTable = {
      tableHeaders: this.tableHeaders,
      tableData: this.dataSource.data,
      tableDisplayCols: this.displayedColumns
    };
    return !_.isEqual(this.standardTable, currentTableState);
  }

  private applyTableData(tableData: Array<object>, change: ITableChange | null = null): void {
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
    if (change) {
      this.setChanges(change);
    }
  }

  private applyTableHeaders(tableHeaders: Array<ITableHeader>, displayedColumns: Array<string>, change: ITableChange | null = null): void {
    this.tableHeaders = tableHeaders;
    this.displayedColumns = displayedColumns;
    if (change) {
      this.setChanges(change);
    }
  }

  private saveTableHeader(colLabel: string, colProp: string = colLabel, currentColProp: string = colProp): void {
    // if include - change header and column, else - create new column;
    // if you change column - 3rd parameter is required

    const tableHeaderChange: ITableChange = {
      type: '',
      rowIndex: null,
      columnIndex: null,
      currentValue: null,
      tableData: null,
      tableHeaders: null,
      tableDisplayCols: null,
    };

    if (this.displayedColumns.includes(currentColProp)) {
      const oldColIndex: number = this.displayedColumns.indexOf(currentColProp);
      const tableData: Array<object> = this.dataSource.data.map(data => ({...data}));
      const tableFullHeader: Array<ITableHeader> = this.tableHeaders.map(header => ({...header}));
      const tableColumnsNames: Array<string> = [...this.displayedColumns];
      tableHeaderChange.type = 'thChange';

      tableFullHeader.splice(oldColIndex, 1, {label: colLabel, property: colProp, isEditColumnData: true});
      tableColumnsNames.splice(oldColIndex, 1, colProp);

      tableData.forEach(data => {
        const dataValue: number | string = data[currentColProp];
        data[colProp] = dataValue;
        delete data[currentColProp];
      });

      this.applyTableData(tableData);
      this.applyTableHeaders(tableFullHeader, tableColumnsNames, tableHeaderChange);
    } else {
      const tableFullHeader: Array<ITableHeader> = this.tableHeaders.concat({label: colLabel, property: colProp, isEditColumnData: true});
      const tableColumnsNames: Array<string> = [...this.displayedColumns, colProp];
      tableHeaderChange.type = 'colCreate';

      this.applyTableHeaders(tableFullHeader, tableColumnsNames, tableHeaderChange);
    }
  }

  public changeHeader(header: ITableHeader, ev: Event): void {
    const evTargetInput: HTMLInputElement  = ev.target as HTMLInputElement;
    const { property: currentColPropName } = header;

    if (!evTargetInput.classList.contains('invalid')) {
      this.saveTableHeader(evTargetInput.value, evTargetInput.value, currentColPropName);
    }
  }

  public onRemoveRow(data: object): void {
    const filteredRows: Array<object> = this.dataSource.data.filter(_data => !_.isEqual(_data, data));
    const tableChange: TableChange = {
      type: 'removeRow',
      rowIndex: null,
      columnIndex: null,
      currentValue: null,
      tableData: null,
      tableHeaders: null,
      tableDisplayCols: null,
    };
    this.applyTableData(filteredRows, tableChange);
  }

  public onAddColumn(): void {
    const tempColumnName: string = `tempColumn${this.tempColumnNumb++}`;
    this.saveTableHeader('column name', tempColumnName);
  }

  public onRemoveColumn(ev: Event, columnProp: string): void {
    ev.stopPropagation();
    const tableData: Array<object> = this.dataSource.data.map(data => ({...data}));
    const tableDataChange: ITableChange = {
      type: 'colDelete',
      rowIndex: null,
      columnIndex: null,
      currentValue: null,
      tableData: null,
      tableHeaders: null,
      tableDisplayCols: null,
    };
    tableDataChange.columnIndex = this.displayedColumns.indexOf(columnProp);

    this.tableHeaders = this.tableHeaders.filter(view => view.property !== columnProp);
    this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== columnProp);
    tableData.forEach(item => delete item[columnProp]);

    this.applyTableData(tableData, tableDataChange);
  }

  public changeTableData(header: ITableHeader, ev: Event, rowData: Object, colTableIndex: number): void {
    const evTarget: HTMLInputElement = ev.target as HTMLInputElement;
    let tableData: Array<object>;
    let editRowData: Object;
    let tableRowIndex: number;
    let currentData: number | string;

    if (evTarget.classList.contains('invalid')) {
      return;
    }

    tableData = this.dataSource.data.map(data => ({...data}));
    editRowData = {...rowData};
    tableRowIndex = tableData.findIndex(data => _.isEqual(data, rowData));
    currentData = evTarget.value;

    if (evTarget.value) {
      editRowData[header.property] = currentData;
    } else {
      delete editRowData[header.property];
    }
    tableData[tableRowIndex] = editRowData;

    const tableDataChange: ITableChange = {
      type: 'tdChange',
      rowIndex: tableRowIndex,
      columnIndex: colTableIndex,
      currentValue: currentData,
      tableData: null,
      tableHeaders: null,
      tableDisplayCols: null,
    };

    this.applyTableData(tableData, tableDataChange);
  }

  public moveToChange(str: string): void {

    if (str === 'next') {

      if (this.tableChangeIndex === this.tableChanges.length - 1) {
        return;
      }

      ++this.tableChangeIndex;

    } else if (str === 'prev') {

      if (this.tableChangeIndex === 0) {
        return;
      }

      --this.tableChangeIndex;
    }

    this.applyChange();
  }

  public applyChange(index: number = this.tableChangeIndex): void {

    if (this.searchField && this.searchField.nativeElement.value) {
      this.applyFilter(this.searchField.nativeElement.value);
    }

    const { tableData, tableHeaders, tableDisplayCols } = this.getTableState(index) as IStandardTable;
    this.applyTableData(tableData);
    this.applyTableHeaders(tableHeaders, tableDisplayCols);

    if (this.searchField && this.searchField.nativeElement.value) {
      this.applyFilter(this.searchField.nativeElement.value);
    }
  }

  public onSave(): void {
    this.onSaveData.emit(this.getTableState(this.tableChangeIndex) as IStandardTable);
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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

  public ngOnInit(): void {
    this.tableHeaders = this.options.tableHeaders;
    this.tableClass = this.options.tableClass;
    this.displayedColumns = this.tableHeaders.map(header => header.property);
    this.dataSource = new MatTableDataSource(this.tableView);
    this.standardTable.tableData = this.dataSource.data.map(data => ({...data}));
    this.standardTable.tableHeaders = this.tableHeaders.map(header => ({...header}));
    this.standardTable.tableDisplayCols = [...this.displayedColumns];

    const tableDataChange: ITableChange = {
      type: 'firstState',
      rowIndex: null,
      columnIndex: null,
      currentValue: null,
      tableData: null,
      tableHeaders: null,
      tableDisplayCols: null,
    };
    this.setChanges(tableDataChange);
  }
}

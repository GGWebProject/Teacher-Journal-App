import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IStandardTable, ITableHeader, ITableChange } from './interfaces';
import { TableOptions } from './models/table-options';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TableChange } from './models/table-change';

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

  @Input () public options: TableOptions;
  @Input () public tableView: Array<object>;

  @ViewChild (MatSort, {static: false}) public sort: MatSort;

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
    change.tableData = [...this.dataSource.data];
    change.tableHeaders = [...this.tableHeaders];
    change.tableDisplayCols = [...this.displayedColumns];
    this.tableChanges = this.tableChanges.concat(new TableChange(change));
    this.tableChangeIndex++;
  }

  get isTableChange(): boolean {
    const currentTableState: IStandardTable = {
      tableHeaders: this.tableHeaders,
      tableData: this.dataSource.data,
      tableDisplayCols: this.displayedColumns
    };
    return JSON.stringify(this.standardTable) !== JSON.stringify(currentTableState);
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
      const tableFullHeader: Array<ITableHeader> = [...this.tableHeaders];
      const tableColumnsNames: Array<string> = [...this.displayedColumns];
      tableHeaderChange.type = 'thChange';

      tableFullHeader.splice(oldColIndex, 1, {label: colLabel, property: colProp});
      tableColumnsNames.splice(oldColIndex, 1, colProp);

      this.applyTableHeaders(tableFullHeader, tableColumnsNames, tableHeaderChange);
    } else {
      const tableFullHeader: Array<ITableHeader> = this.tableHeaders.concat({label: colLabel, property: colProp});
      const tableColumnsNames: Array<string> = [...this.displayedColumns, colProp];
      tableHeaderChange.type = 'colCreate';

      this.applyTableHeaders(tableFullHeader, tableColumnsNames, tableHeaderChange);
    }
  }

  public changeHeader(header: ITableHeader, ev: Event): void {
    const evTarget: HTMLInputElement  = ev.target as HTMLInputElement;
    const { property: currentColPropName } = header;
    this.saveTableHeader(evTarget.value, evTarget.value, currentColPropName);
  }

  public onAddColumn(): void {
    const tempColumnName: string = `tempColumn${this.tempColumnNumb++}`;
    this.saveTableHeader('column name', tempColumnName);
  }

  public onRemoveColumn(ev: Event, columnProp: string): void {
    ev.stopPropagation();
    const tableData: Array<object> = [...this.dataSource.data];
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
    const evTarget: HTMLInputElement  = ev.target as HTMLInputElement;
    const tableData: Array<object> = [...this.dataSource.data];
    const editRowData: Object = {...rowData};
    const tableRowIndex: number = tableData.findIndex(data => JSON.stringify(data) === JSON.stringify(rowData));
    const currentData: number | string = evTarget.value;
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

  public applyPrevChange(): void {
    if (this.tableChangeIndex === 0) {
      return;
    }

    const { tableData, tableHeaders, tableDisplayCols } = this.getTableState(--this.tableChangeIndex) as IStandardTable;
    this.applyTableData(tableData);
    this.applyTableHeaders(tableHeaders, tableDisplayCols);
  }

  public applyNextChange(): void {
    if (this.tableChangeIndex === this.tableChanges.length - 1) {
      return;
    }

    const { tableData, tableHeaders, tableDisplayCols } = this.getTableState(++this.tableChangeIndex) as IStandardTable;
    this.applyTableData(tableData);
    this.applyTableHeaders(tableHeaders, tableDisplayCols);
  }

  public onSave(): void {
    console.log('save');
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public ngOnInit(): void {
    this.tableHeaders = this.options.tableHeaders;
    this.tableClass = this.options.tableClass;
    this.displayedColumns = this.tableHeaders.map(header => header.property);
    this.dataSource = new MatTableDataSource(this.tableView);
    this.standardTable.tableData = [...this.dataSource.data];
    this.standardTable.tableHeaders = [...this.tableHeaders];
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
}

import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ITableHeader } from '../../../common/interfaces';
import { TableOptions } from './models/table-options';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit, AfterViewInit {

  public tableHeaders: Array<ITableHeader>;
  public tableClass: string;
  public displayedColumns: Array<string>;
  public columnsToDisplay: Array<string>;
  public dataSource: any;

  @Input () public options: TableOptions;
  @Input () public tableView: Array<object>;

  @ViewChildren (MatSort) public sortQueryList:  QueryList<MatSort>;

  // tslint:disable-next-line:no-empty
  constructor() {}

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sortQueryList.first;
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
    console.log(this.dataSource.filteredData);
  }

  public addColumn(): void {
    this.columnsToDisplay.push('id');
  }

}

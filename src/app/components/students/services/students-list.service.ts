import { Injectable } from '@angular/core';
import { Subject } from '../../../common/entities';
import { ITableHeader } from '../../../shared/components/table/interfaces/itable-header';

@Injectable({
  providedIn: 'root'
})
export class StudentsListService {

  constructor() { }

  public getSubjectTableDates (subject: Subject): Array<ITableHeader> {
    let tableHeaderDates: Array<ITableHeader> = [];

    if (subject.dates.length === 0) {
      return tableHeaderDates;
    }

    tableHeaderDates = subject.dates.map( (date: string) => { return { label: date.slice(0, date.lastIndexOf('.')), property: date}; });

    return tableHeaderDates;
  }
}

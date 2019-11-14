import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelExportService {
  public exportAsExcelFile(data: HTMLTableElement | any[], excelFileName: string): void {
    let worksheet: XLSX.WorkSheet;
    if (data instanceof Array) {
      worksheet = XLSX.utils.json_to_sheet(data);
    } else if (data) {
      worksheet = XLSX.utils.table_to_sheet(data);
    }
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'SheetJS.xlsx');
  }
}

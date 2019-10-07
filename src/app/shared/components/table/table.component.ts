import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  // private tableHead
  // private tableData

  @Input () public options: object;

  constructor() { }

  ngOnInit() {
    console.log(this.options);
  }

}

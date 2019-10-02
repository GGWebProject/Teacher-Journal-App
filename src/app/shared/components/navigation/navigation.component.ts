import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  public navigationLinks: Array<string> = ['students', 'subjects', 'statistics', 'export'];

  // tslint:disable-next-line:no-empty
  constructor() {}

  // tslint:disable-next-line:no-empty typedef
  public ngOnInit() {}

}

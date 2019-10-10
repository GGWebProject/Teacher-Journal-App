import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent {

  @Input() public navigationLinks: Array<string>;
  @Input() public navigationClass?: string = '';

  // tslint:disable-next-line:no-empty
  constructor() {}
}

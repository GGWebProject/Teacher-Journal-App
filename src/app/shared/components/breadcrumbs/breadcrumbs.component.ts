import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {Breadcrumb} from './entities/breadcrumb';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})

export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs: Array<Breadcrumb> = [];

  @Input() public breadcrumbName: string;
  @Input() public breadcrumbClass?: string = '';

  constructor(
    private router: Router,
  ) {

  }

  private createBreadbrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        routeURL = `${url}/${routeURL}`;
      }

      const label: string = child.snapshot.data[this.breadcrumbName];

      if (!!label && !!routeURL) {
        breadcrumbs.push({ label, url: routeURL });
      }

      return this.createBreadbrumbs(child, routeURL, breadcrumbs);
    }
  }

  public ngOnInit(): void {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
    )
    .subscribe(() => {
      this.breadcrumbs = this.createBreadbrumbs(this.router.routerState.root);
    });
  }
}

import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ICanComponentDeactivate } from '../interfaces/ican-component-deactivate';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {
  public canDeactivate(
    component: ICanComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('CanDeactivate Guard is called');
    return component.canDeactivate();
  }
}

import { Observable } from 'rxjs';
import {UrlTree} from '@angular/router';

export interface ICanComponentDeactivate {
  canDeactivate: () =>
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}

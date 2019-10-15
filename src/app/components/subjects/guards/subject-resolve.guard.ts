import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subject } from '../../../common/entities';
import { DataService } from '../../../common/services/data.service';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectResolveGuard implements Resolve<Subject> {

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Subject | null> {

    const id: number = +route.paramMap.get('subjectId');

    return this.dataService.getSubject(id)
      .pipe(
        map((subject: Subject) => {
          if (subject) {
            return subject;
          } else {
            this.router.navigate(['/subjects']);
            return null;
          }
        }),
        take(1),
        catchError(() => {
          this.router.navigate(['/subjects']);
          return of(null);
        })
      );
  }
}

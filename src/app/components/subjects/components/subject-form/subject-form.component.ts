import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from '../../../../common/entities';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../../../../common/services/data.service';
import { switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.sass']
})
export class SubjectFormComponent implements OnInit {

  private subject: Subject;
  private originalSubject: Subject;

  @ViewChild('subjectFormComponent', { static: false }) public subjectFormComponent: NgForm;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  public onSave(): void {
    const method: string = this.subject.id ? 'updateSubject' : 'saveSubject';
    this.dataService[method](this.subject)
      .subscribe(
        () => {
          this.originalSubject = { ...this.subject };
          this.router.navigate(['/subjects']);
        },
        err => console.log(err)
      );
  }

  public canDeactivate(): boolean {
    return _.isEqual(this.subject, this.originalSubject) || window.confirm('You didn`t save the student. Are you sure you want to exit?');
  }

  public ngOnInit(): void {
    this.subject = new Subject();

    this.route.paramMap
      .pipe(
        switchMap(
          (params: ParamMap) => {
            return params.get('subjectId') ?
              this.dataService.getSubject(+params.get('subjectId'))
              :
              of( new Subject());
          }
        )
      )
      .subscribe(
        (subject: Subject) => {
          this.subject = {...subject};
          this.originalSubject = {...subject};
        },
        err => console.log(err)
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../../../common/services/data.service';
import { SubjectList } from '../../../../common/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.sass']
})
export class SubjectsListComponent implements OnInit {

  private subjectsData$: Observable<Array<SubjectList>>;

  public subjectsList: Array<SubjectList>;

  constructor(
    private dataService: DataService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.subjectsData$ = this.dataService.getSubjectsList();
    this.subjectsData$.subscribe(
data => {
        this.subjectsList = data;
      },
err => console.log(err),
    );
  }

  public onCreateSubject(): void {
    const link: Array<string> = ['/subjects/add'];
    this.router.navigate(link);
  }

  public editSubject(subjectId: number): void {
    const link: Array<string> = [`subjects/subject/${subjectId}/edit`];
    this.router.navigate(link);
  }

  public removeSubject(subjectId: number): void {
    if (window.confirm('Are you sure?')) {
      this.dataService.deleteSubject(subjectId)
        .subscribe(
          () => {
            this.router.navigate(['subjects']);
          }
        );
    }
  }

}

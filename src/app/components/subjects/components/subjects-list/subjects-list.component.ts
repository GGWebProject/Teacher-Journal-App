import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../../../common/services/data.service';
import { SubjectList } from '../../../../common/entities';

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

}

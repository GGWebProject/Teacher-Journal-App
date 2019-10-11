import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from '../../../../common/services/data.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-subject-journal',
  templateUrl: './subject-journal.component.html',
  styleUrls: ['./subject-journal.component.sass']
})
export class SubjectJournalComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('subjectId'));
  }

}

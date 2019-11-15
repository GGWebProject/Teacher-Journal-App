import { Component} from '@angular/core';
import { ExcelExportService } from '../../shared/services/excel-export.service';
import { Student } from '../../common/entities';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.sass']
})
export class ExportComponent {

  public studentsLoadStatus: {loaded: boolean, loading: boolean};
  public studentsSub: Subscription;

  constructor(
    private excelService: ExcelExportService,
    private store: Store<fromStore.IState>,
  ) {}

  public exportStudentAsExcel(): void {

    this.studentsSub =  this.store.select(fromStore.getStudents)
      .subscribe(
      (students: Array<Student>) => {
        console.log(students);
        if (students.length === 0) {
          this.store.dispatch(fromStore.studentsLoad());
        } else {
          this.excelService.exportAsExcelFile(students, 'StudentsFile');
        }

        if (this.studentsSub) {
          this.studentsSub.unsubscribe();
        }
      },
    );

    this.store.select(fromStore.getStudentsLoadStatus).subscribe(
      data => {
        this.studentsLoadStatus = {...data};
      },
    );
  }
}

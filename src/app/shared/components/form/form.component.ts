import { AfterViewInit, Component,
  ContentChildren, EventEmitter, Input,
  Output, QueryList, ViewChild
} from '@angular/core';

import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})

export class FormComponent implements AfterViewInit {

  @Input() public submitButtonText: string;

  @Output() public saveForm: EventEmitter<NgForm> = new EventEmitter<NgForm>();

  @ContentChildren(NgModel) public models: QueryList<NgModel>;
  @ViewChild(NgForm, {static: false}) public form: NgForm;

  public ngAfterViewInit(): void {
    let ngContentModels: NgModel[] = this.models.toArray();

    ngContentModels.forEach((input: NgModel) => {
      this.form.addControl(input);
    });

  }

  public onSaveForm(): void {
    this.saveForm.emit(this.form);
  }
}

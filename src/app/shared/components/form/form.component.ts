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

  @Input() public entity: string;
  @Input() public submitButtonText: string;

  @Output() public formData: EventEmitter<NgForm> = new EventEmitter<NgForm>();

  @ContentChildren(NgModel) public models: QueryList<NgModel>;
  @ViewChild(NgForm, {static: false}) public form: NgForm;

  constructor(
  ) {}

  public ngAfterViewInit(): void {
    let ngContentModels: NgModel[] = this.models.toArray();

    ngContentModels.forEach((input: NgModel) => {
      this.form.addControl(input);
    });

  }

  public onSaveForm(): void {
    this.formData.emit(this.form);
  }
}

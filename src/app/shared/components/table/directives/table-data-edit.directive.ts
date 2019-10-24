import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeaderEdit]'
})
export class TableDataEditDirective implements AfterViewInit {

  private delSelfTableHeaders: Array<string> = [];

  @Input('appHeaderEdit') public tableHeaders?: Array<string>;
  @Input() public validationData: Array<string>;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  @HostListener('dblclick', ['$event'])
  private onDblclick (): void {
    if (this.isSingularInput()) {
      this.renderEditField(this.el.nativeElement);
    }
  }

  @HostListener('click', ['$event'])
  private onClick (event: MouseEvent): void {
    event.stopPropagation();
  }

  private validationInput(input: HTMLInputElement): void {
    const regExp: RegExp = new RegExp(this.validationData[0] || '.*');
    const isInputValid: boolean = this.tableHeaders ?
      regExp.test(input.value) && !this.delSelfTableHeaders.includes(input.value)
      :
      regExp.test(input.value);

    if (isInputValid) {
      this.renderer.removeClass(input, 'invalid');
      this.renderer.addClass(input, 'valid');
    } else {
      this.renderer.removeClass(input, 'valid');
      this.renderer.addClass(input, 'invalid');
    }
  }

  private renderEditField(element: HTMLElement): void {
    const elementText: string = element.innerText;
    const input: HTMLInputElement = this.renderer.createElement('input');

    if (!!this.tableHeaders) {
      this.delSelfTableHeaders = this.tableHeaders.filter(header => header !== elementText);
    }

    this.renderer.setProperty(input, 'value', elementText);
    element.innerText = '';
    element.appendChild(input);
    input.focus();
    this.validationInput(input);

    this.renderer.listen(input, 'input', () => {
      this.validationInput(input);
    });

    this.renderer.listen(input, 'blur', () => {
      if (input.classList.contains('invalid')) {
        input.focus();
      } else {
        this.saveValueFromInput(input, element);
      }
    });
  }

  private saveValueFromInput(input: HTMLInputElement, element: HTMLElement): void {
    const inputValue: string = input.value;
    this.renderer.removeChild(element, input);
    element.innerText = inputValue;
  }

  private isSingularInput(): boolean {
    const table: HTMLTableElement = this.el.nativeElement.closest('table');
    return table.querySelectorAll('input').length === 0;
  }

  public ngAfterViewInit(): void {
    if (!(this.validationData instanceof Array)) {
      this.validationData = [];
    }

    this.renderer.listen( this.el.nativeElement, 'mouseenter', () => {
      this.renderer.addClass(this.el.nativeElement, 'edit-element');
    });
    this.renderer.listen( this.el.nativeElement, 'mouseleave', () => {
      this.renderer.removeClass(this.el.nativeElement, 'edit-element');
    });
  }
}

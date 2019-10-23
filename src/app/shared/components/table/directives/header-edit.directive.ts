import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHeaderEdit]'
})
export class HeaderEditDirective implements AfterViewInit {

  private delSelfTableHeaders: Array<string> = [];

  @Input('appHeaderEdit') public tableHeaders?: Array<string>;
  @Input() public validationHeaders?: Array<string> = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  @HostListener('dblclick', ['$event'])
  private onDblclick (): void {
    this.renderEditField(this.el.nativeElement);
  }

  @HostListener('click', ['$event'])
  private onClick (event: MouseEvent): void {
    event.stopPropagation();
  }

  private validationInput(input: HTMLInputElement): void {
    const regExp: RegExp = new RegExp(this.validationHeaders[0] || '.*');
    if (regExp.test(input.value) && !this.delSelfTableHeaders.includes(input.value)) {
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
    this.delSelfTableHeaders = this.tableHeaders.filter(header => header !== elementText);
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

  public ngAfterViewInit(): void {
    this.renderer.listen( this.el.nativeElement, 'mouseenter', () => {
      this.renderer.addClass(this.el.nativeElement, 'edit-element');
    });
    this.renderer.listen( this.el.nativeElement, 'mouseleave', () => {
      this.renderer.removeClass(this.el.nativeElement, 'edit-element');
    });
  }
}

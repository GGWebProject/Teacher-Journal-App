import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeaderEdit]'
})
export class HeaderEditDirective implements AfterViewInit {

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

  private renderEditField(element: HTMLElement): void {
    const elementText: string = element.innerText;
    const input: HTMLInputElement = this.renderer.createElement('input');
    this.renderer.setProperty(input, 'value', elementText);
    element.innerText = '';
    element.appendChild(input);
    input.focus();
    this.renderer.listen(input, 'blur', () => {
      this.saveValueFromInput(input, element);
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

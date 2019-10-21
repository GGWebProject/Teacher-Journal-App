import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appStopPropagation]'
})
export class StopPropagationDirective {

  constructor(
    private el: ElementRef,
  ) { }

  @HostListener('click', ['$event'])
  private onClick (event: MouseEvent): void {
    console.log('lal');
    event.stopPropagation();
  }
}

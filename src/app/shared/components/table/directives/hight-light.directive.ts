import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { ITableHighLightOptions } from '../interfaces';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective implements AfterViewInit {

  @Input('appHighLight') private highLightOptions: ITableHighLightOptions;

  constructor(
    private el: ElementRef,
  ) { }

  private applyColor(color: string): void {
    this.el.nativeElement.style.setProperty('background-color', color);
  }

  private getCell(cells: Array<HTMLTableCellElement>): HTMLTableCellElement {
    const { compareCellClass } = this.highLightOptions;
    return [].find.call(cells, cell => cell.classList.value.includes(compareCellClass));
  }

  public ngAfterViewInit(): void {

    if (!this.highLightOptions || !this.highLightOptions.isEnable) {
      return;
    }

    const { lessValueColor, moreAndEqualValueColor, middleValue } = this.highLightOptions;
    const compareCell: HTMLTableCellElement = this.getCell(this.el.nativeElement.cells);

    if (!!compareCell) {
      let compareCellValue: number | string;

      if (typeof middleValue === 'number') {
        compareCellValue = parseInt(compareCell.innerText, 10);
      } else {
        compareCellValue = compareCell.innerText;
      }

      if (compareCellValue < middleValue) {
        this.applyColor(lessValueColor);
      } else {
        this.applyColor(moreAndEqualValueColor);
      }
    }
  }
}

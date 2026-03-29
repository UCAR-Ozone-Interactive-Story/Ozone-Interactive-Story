import { AfterViewInit, Directive } from '@angular/core';
import { NarrativeText } from './narrative-text';

@Directive({
  selector: '[setTabIndexOne]',
})
export class setTabIndexOne implements AfterViewInit {
  constructor(private host: NarrativeText) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.host.dialogTabIndex = 1;
    });
  }
}

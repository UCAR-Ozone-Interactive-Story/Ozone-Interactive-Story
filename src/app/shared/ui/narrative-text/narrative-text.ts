import { Component, input, output, signal, effect, OnDestroy, HostListener } from '@angular/core';
import { setTabIndexOne } from './setTabIndexOne';

@Component({
  selector: 'app-narrative-text',
  standalone: true,
  templateUrl: './narrative-text.html',
  styleUrl: './narrative-text.scss',
  imports: [setTabIndexOne],
})
export class NarrativeText implements OnDestroy {
  text = input.required<string>();
  character = input<string>();

  completed = output<void>(); // emits when clicked after text is fully visible
  private _dialogTabIndex = 0;
  set dialogTabIndex(value: number) {
    this._dialogTabIndex = value;
  }
  get dialogTabIndex() {
    return this._dialogTabIndex;
  }

  displayedText = signal('');
  isComplete = signal(false);
  private timer = 0;
  private startDelayTimer = 0;
  startDelay = input(0);

  constructor() {
    effect(() => {
      const fullText = this.text();
      const delay = this.startDelay();

      if (this.startDelayTimer) {
        clearTimeout(this.startDelayTimer);
      }
      this.startDelayTimer = window.setTimeout(() => {
        this.resetAndType(fullText);
      }, delay);
    });
  }

  private resetAndType(fullText: string) {
    this.clearTimer();
    this.displayedText.set('');
    this.isComplete.set(false);

    let i = 0;
    this.timer = window.setInterval(() => {
      if (i < fullText.length) {
        this.displayedText.update((current) => current + fullText.charAt(i));
        i++;
      } else {
        this.finish();
      }
    }, 30); // 30ms per character
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // this stops space/enter from not working on other keyboard accessible elements
    // previously this would override space/enter on buttons
    const target = event.target as HTMLElement;
    const isInteractiveElement =
      target instanceof HTMLButtonElement ||
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement ||
      target?.getAttribute('role') === 'button';

    if (!isInteractiveElement && (event.code === 'Space' || event.code === 'Enter')) {
      event.preventDefault();
      this.advance();
    }
  }

  advance() {
    if (this.isComplete()) {
      this.completed.emit();
    } else {
      this.finish();
    }
  }

  private finish() {
    this.clearTimer();
    this.displayedText.set(this.text());
    this.isComplete.set(true);
    this.completed.emit();
  }

  private clearTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}

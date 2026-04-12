import {
  Component,
  input,
  output,
  signal,
  effect,
  OnDestroy,
  HostListener,
  ViewChild,
  viewChild,
  ElementRef,
} from '@angular/core';
import { setTabIndexOne } from './setTabIndexOne';

@Component({
  selector: 'app-narrative-text',
  standalone: true,
  templateUrl: './narrative-text.html',
  styleUrl: './narrative-text.scss',
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

  paragraph = viewChild.required<ElementRef>('paragraph');
  displayedText = signal('');
  isComplete = signal(false);
  private timer = 0;
  private startDelayTimer = 0;
  startDelay = input(0);
  insideTag = false;
  indexOfLastCharInTag = Number.MAX_SAFE_INTEGER;
  assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
      throw new Error(`Expected value to be defined, but received ${val}`);
    }
  }

  isStartOfListTag(fullText: string, index: number) {
    const next_four_chars = fullText.substring(index, index + 4);
    if (next_four_chars === '<ul>') {
      return true;
    } else {
      return false;
    }
  }
  getFirstTag(str: string) {
    const matches = str.match(/\<([a-zA-Z]+)\>/);
    this.assertIsDefined(matches);
    return matches[0];
  }
  insertAt(str: string, substr: string, index: number) {
    return str.slice(0, index) + substr + str.slice(index + 1);
  }
  getIndexStartOfEndTag(str: string) {
    return str.indexOf('</');
  }

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
    this.isComplete.set(false);

    const textElmenent = this.paragraph().nativeElement;
    if (!(textElmenent instanceof HTMLElement)) {
      throw new Error('textContent should be an HTMLElement');
    }
    textElmenent.innerHTML = '';

    // this.displayedText.set('');
    let i = 0;
    this.timer = window.setInterval(() => {
      if (i < fullText.length) {
        if (fullText.charAt(i) == '\n') {
          textElmenent.innerHTML += '<br>';
          i += 2;
        } else {
          textElmenent.innerHTML += fullText.charAt(i);
          i++;
        }
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
    const textElement = this.paragraph().nativeElement;
    if (textElement instanceof HTMLElement) {
      textElement.innerHTML = this.text().replaceAll('\n', '<br>');
    }
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

import {
  Component,
  input,
  output,
  signal,
  effect,
  OnDestroy,
  HostListener,
  viewChild,
  ElementRef,
  inject,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setTabIndexOne } from './setTabIndexOne';

@Component({
  selector: 'app-narrative-text',
  standalone: true,
  templateUrl: './narrative-text.html',
  styleUrl: './narrative-text.scss',
})
export class NarrativeText implements OnDestroy {
  private translate = inject(TranslateService);

  textKey = input.required<string>();
  textParams = input<Record<string, unknown>>({});
  character = input<string>();

  completed = output<void>();
  private _dialogTabIndex = 0;
  set dialogTabIndex(value: number) { this._dialogTabIndex = value; }
  get dialogTabIndex() { return this._dialogTabIndex; }

  paragraph = viewChild.required<ElementRef>('paragraph');
  isComplete = signal(false);
  private timer = 0;
  private startDelayTimer = 0;
  startDelay = input(0);

  assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
      throw new Error(`Expected value to be defined, but received ${val}`);
    }
  }

  constructor() {
    effect(() => {
      const key = this.textKey();
      const params = this.textParams();
      const delay = this.startDelay();

      if (this.startDelayTimer) clearTimeout(this.startDelayTimer);

      this.startDelayTimer = window.setTimeout(() => {
        this.translate.get(key, params).subscribe(translated => {
          this.resetAndType(translated);
        });
      }, delay);
    });
  }

  private resetAndType(fullText: string) {
    this.clearTimer();
    this.isComplete.set(false);

    const textElement = this.paragraph().nativeElement;
    if (!(textElement instanceof HTMLElement)) {
      throw new Error('textContent should be an HTMLElement');
    }
    textElement.innerHTML = '';

    let i = 0;
    this.timer = window.setInterval(() => {
      if (i < fullText.length) {
        if (fullText.charAt(i) === '\n') {
          textElement.innerHTML += '<br>';
          i += 2;
        } else {
          textElement.innerHTML += fullText.charAt(i);
          i++;
        }
      } else {
        this.finish(fullText);
      }
    }, 30);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
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
      this.translate.get(this.textKey(), this.textParams()).subscribe(translated => {
        this.finish(translated);
      });
    }
  }

  private finish(fullText: string) {
    this.clearTimer();
    const textElement = this.paragraph().nativeElement;
    if (textElement instanceof HTMLElement) {
      textElement.innerHTML = fullText.replaceAll('\n', '<br>');
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
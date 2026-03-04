import { Component, input, output, signal, effect, OnDestroy, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-narrative-text',
  standalone: true,
  templateUrl: './narrative-text.html',
  styleUrl: './narrative-text.scss'
})
export class NarrativeText implements OnDestroy {
  textKey = input.required<string>();
  character = input<string>();

  completed = output<void>(); // emits when clicked after text is fully visible

  displayedText = signal('');
  isComplete = signal(false);
  private timer = 0;
  private startDelayTimer = 0;
  startDelay = input(0);

  private translate = inject(TranslateService);

  constructor() {
    effect(() => {
      const key = this.textKey();
      const delay = this.startDelay();

      if (this.startDelayTimer) {
        clearTimeout(this.startDelayTimer);
      }

      this.startDelayTimer = window.setTimeout(() => {
        const translated = this.translate.instant(key);
        this.resetAndType(translated);
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
        this.displayedText.update(current => current + fullText.charAt(i));
        i++;
      } else {
        this.finish();
      }
    }, 30); // 30ms per character
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
    this.displayedText.set(this.translate.instant(this.textKey()));
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

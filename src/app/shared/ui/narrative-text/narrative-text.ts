import { Component, input, output, signal, effect, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-narrative-text',
  standalone: true,
  templateUrl: './narrative-text.html',
  styleUrl: './narrative-text.scss'
})
export class NarrativeText implements OnDestroy {
  text = input.required<string>();
  character = input<string>();

  completed = output<void>(); // emits when clicked after text is fully visible

  displayedText = signal('');
  isComplete = signal(false);
  private timer: any;

  constructor() {
    effect(() => {
      const fullText = this.text();
      this.resetAndType(fullText);
    });
  }

  private resetAndType(fullText: string) {
    this.clearTimer();
    this.displayedText.set('');
    this.isComplete.set(false);

    let i = 0;
    this.timer = setInterval(() => {
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

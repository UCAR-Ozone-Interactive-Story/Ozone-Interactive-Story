import { Component, input, output, signal, effect, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-narrative-text',
  standalone: true,
  templateUrl: './narrative-text.html',
  styleUrl: './narrative-text.scss'
})
export class NarrativeText implements OnDestroy {
  // Inputs
  text = input.required<string>();
  character = input<string>();

  // Outputs
  completed = output<void>(); // Emits when user clicks AFTER text is done

  // Internal State
  displayedText = signal('');
  isComplete = signal(false);
  private timer: any;

  constructor() {
    // Effect: Restarts animation whenever the 'text' input changes
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
    }, 30); // Speed: 30ms per character
  }

  // Handle User Click
  advance() {
    if (this.isComplete()) {
      // If text is done, tell parent to move to next scene
      this.completed.emit();
    } else {
      // If typing, skip to end immediately
      this.finish();
    }
  }

  private finish() {
    this.clearTimer();
    this.displayedText.set(this.text()); // Force full text
    this.isComplete.set(true);
  }

  private clearTimer() {
    if (this.timer) clearInterval(this.timer);
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}

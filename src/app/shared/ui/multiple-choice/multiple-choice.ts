import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectorOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

/**
 * Component for multiple choice questions
 *
 * @example
 * // Usage with default options (Is the sky blue???)
 * <app-multiple-choice></app-multiple-choice>
 *
 * @example
 * // For custom questions
 * <app-multiple-choice
 *   [question]="'Is the sky blue?'"
 *   [options]="[
 *     { id: 'yes', label: 'Yes', isCorrect: true },
 *     { id: 'no', label: 'No', isCorrect: false }
 *   ]"
 *   (optionSelected)="onOptionSelected($event)"
 * ></app-multiple-choice>
 *
 * @example
 * // Disabled state
 * <app-multiple-choice [disabled]="true"></app-multiple-choice>
 */
@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiple-choice.html',
  styleUrl: './multiple-choice.scss'
})
export class MultipleChoice {
  question = input<string>('Is The Sky Blue?');
  options = input<SelectorOption[]>([
    { id: 'yes', label: 'Yes', isCorrect: true },
    { id: 'no', label: 'No', isCorrect: false }
  ]);
  disabled = input<boolean>(false);

  optionSelected = output<SelectorOption>();

  selectedOptions = signal<Set<string>>(new Set());

  selectOption(optionId: string) {
    if (this.disabled()) return;

    const newSelection = new Set(this.selectedOptions());
    if (newSelection.has(optionId)) {
      newSelection.delete(optionId);
    } else {
      newSelection.add(optionId);
    }
    this.selectedOptions.set(newSelection);

    const option = this.options().find(opt => opt.id === optionId);
    if (option) {
      this.optionSelected.emit(option);
    }
  }

  isSelected(optionId: string): boolean {
    return this.selectedOptions().has(optionId);
  }

  getOptionById(optionId: string): SelectorOption | undefined {
    return this.options().find(opt => opt.id === optionId);
  }
}
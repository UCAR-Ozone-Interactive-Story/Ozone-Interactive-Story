import { Component, computed, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

export interface SolutionOption {
  id: string;
  image: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-scene-solutions',
  imports: [NarrativeText, TranslateModule],
  templateUrl: './scene-solutions.html',
  styleUrl: './scene-solutions.scss',
})
export class SceneSolutions {
  story = inject(StoryService);

  options: SolutionOption[] = [
    { id: 'RENEWABLE_ENERGY', image: 'images/backgrounds/sky-grass-background.webp', isCorrect: true },
    { id: 'LOW_POLLUTION_VEHICLE', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: true },
    { id: 'IDLE_ENGINE', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: false },
    { id: 'LOW_VOC_PRODUCTS', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: true },
    { id: 'LESS_ENERGY', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: true },
    { id: 'BURN_TRASH', image: 'images/backgrounds/sky-grass-background.webp', isCorrect: false },
    { id: 'WALK_BIKE_BUS', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: true },
    { id: 'FORGO_FIRE', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: true },
    { id: 'MOW_MORNING', image: 'images/backgrounds/sky-grass-background.webp', isCorrect: false },
    { id: 'COMPOST_YARD_WASTE', image: 'images/backgrounds/sky-grass-background.webp', isCorrect: true },
    { id: 'MOW_EVENING', image: 'images/backgrounds/sky-grass-background.webp', isCorrect: true },
    { id: 'REFUEL_EVENING', image: 'images/backgrounds/cityscape-placeholder.jpg', isCorrect: true }
  ];

  selectedOptions = signal<Set<string>>(new Set());
  isDone = signal(false);

  // Total selected options (used to disable the 'Done' button when 0)
  selectedCount = computed(() => this.selectedOptions().size);

  // Useful for evaluating the user's choices in the conclusion narrative
  correctSelectedCount = computed(() => 
    this.options.filter(o => o.isCorrect && this.selectedOptions().has(o.id)).length
  );

  incorrectSelectedCount = computed(() => 
    this.options.filter(o => !o.isCorrect && this.selectedOptions().has(o.id)).length
  );

  toggleOption(optionId: string) {
    if (this.isDone()) return;

    this.selectedOptions.update(selected => {
      const newSet = new Set(selected);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  }

  finishSelection() {
    this.isDone.set(true);
  }

  onFinalNarrativeCompleted() {
    this.story.setSceneCompleted(true);
  }
}
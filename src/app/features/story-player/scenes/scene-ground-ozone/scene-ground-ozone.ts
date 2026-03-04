import { Component, computed, effect, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CommonModule } from '@angular/common';

export type GroundOzonePhase = 'area' | 'season' | 'density' | 'done';

@Component({
  selector: 'app-scene-ground-ozone',
  imports: [NarrativeText, TranslateModule, CommonModule],
  templateUrl: './scene-ground-ozone.html',
  styleUrl: './scene-ground-ozone.scss',
})
export class SceneGroundOzone {
  story = inject(StoryService);
  translate = inject(TranslateService);
  
  // current choice to be made
  currentChoice = signal<GroundOzonePhase>('area');
  feedbackKey = signal<string | null>(null);
  fadeState = signal<'in' | 'out'>('in');
  // choice state i.e. which was clicked, or none yet
  choiceStatus = signal<{ option: string, isCorrect: boolean } | null>(null);
  
  isTextComplete = signal(false);
  textDelay = signal(this.story.transition().textDelay);

  text = signal('');

  constructor() {
    effect((onCleanup) => {
      const choice = this.currentChoice();
      const feedback = this.feedbackKey();

      let promptKey = '';
      switch (choice) {
        case 'area':
          promptKey = 'SCENES.GROUND_OZONE.AREA.PROMPT';
          break;
        case 'season':
          promptKey = 'SCENES.GROUND_OZONE.SEASON.PROMPT';
          break;
        case 'density':
          promptKey = 'SCENES.GROUND_OZONE.CARS_FACTORIES.PROMPT';
          break;
      }

      const keys = feedback ? [feedback, promptKey] : [promptKey];
      const sub = this.translate.stream(keys).subscribe(res => {
        const feedbackText = feedback ? res[feedback] + ' ' : '';
        const promptText = promptKey ? res[promptKey] : '';
        this.text.set((feedbackText + promptText).trim());
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  private handleSelection(
    option: string,
    isCorrect: boolean,
    nextPhase: GroundOzonePhase,
    correctFeedback: string,
    incorrectFeedback: string
  ) {
    if (!this.isTextComplete() || this.fadeState() === 'out' || this.choiceStatus()?.isCorrect) return;

    this.textDelay.set(0);

    if (isCorrect) {
      this.choiceStatus.set({ option, isCorrect: true });
      
      setTimeout(() => {
        this.fadeState.set('out');
        
        setTimeout(() => {
          this.feedbackKey.set(correctFeedback);
          this.currentChoice.set(nextPhase);
          this.choiceStatus.set(null);
          this.fadeState.set('in');
          this.isTextComplete.set(false);
        }, 500);
      }, 500);
    } else {
      this.choiceStatus.set({ option, isCorrect: false });
      this.feedbackKey.set(incorrectFeedback);
      this.isTextComplete.set(false);
    }
  }

  selectArea(area: 'urban' | 'rural') {
    this.handleSelection(
      area,
      area === 'urban',
      'season',
      'SCENES.GROUND_OZONE.AREA.CORRECT',
      'SCENES.GROUND_OZONE.AREA.INCORRECT'
    );
  }

  selectSeason(season: 'warm' | 'cool') {
    this.handleSelection(
      season,
      season === 'warm',
      'density',
      'SCENES.GROUND_OZONE.SEASON.CORRECT',
      'SCENES.GROUND_OZONE.SEASON.INCORRECT'
    );
  }

  selectDensity(density: 'lots' | 'few') {
    this.handleSelection(
      density,
      density === 'lots',
      'done',
      'SCENES.GROUND_OZONE.CARS_FACTORIES.CORRECT',
      'SCENES.GROUND_OZONE.CARS_FACTORIES.INCORRECT'
    );
  }

  onNarrativeCompleted() {
    this.isTextComplete.set(true);
    if (this.currentChoice() === 'done') {
      this.story.setSceneCompleted(true);
    }
  }

  isFadingOut() {
    return this.fadeState() === 'out';
  }

  getOptionStatus(option: string) {
    const status = this.choiceStatus();
    if (status?.option === option) {
      return status.isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  }
}
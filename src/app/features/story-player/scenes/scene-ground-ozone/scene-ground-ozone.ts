import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { NgClass } from '@angular/common';
import { setTabIndexOne } from '@shared/ui/narrative-text/setTabIndexOne';

export type GroundOzonePhase = 'area' | 'season' | 'density' | 'done';

@Component({
  selector: 'app-scene-ground-ozone',
  imports: [NarrativeText, TranslateModule, NgClass, setTabIndexOne],
  templateUrl: './scene-ground-ozone.html',
  styleUrl: './scene-ground-ozone.scss',
})
export class SceneGroundOzone {
  private destroyRef = inject(DestroyRef);
  story = inject(StoryService);
  translate = inject(TranslateService);

  // current choice to be made
  currentChoice = signal<GroundOzonePhase>('area');
  feedbackKey = signal<string | null>(null);
  fadeState = signal<'in' | 'out'>('in');
  // choice state i.e. which was clicked, or none yet
  choiceStatus = signal<{ option: string; isCorrect: boolean } | null>(null);

  showContinue = signal(false);
  nextPhase = signal<GroundOzonePhase | null>(null);

  isTextComplete = signal(false);
  textDelay = signal(this.story.transition().textDelay);

  text = signal('');
  bottomText = signal('')

  constructor() {
    effect(() => {
      const choice = this.currentChoice();
      const feedbackKey = this.feedbackKey();

      if (feedbackKey) {
        this.text.set(feedbackKey)
        return;
      }

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

      this.text.set(promptKey)
    });
  }

  private handleSelection(
    option: string,
    isCorrect: boolean,
    nextPhase: GroundOzonePhase,
    correctFeedback: string,
    incorrectFeedback: string,
  ) {
    if (!this.isTextComplete() || this.fadeState() === 'out' || this.choiceStatus()?.isCorrect)
      return;

    if (this.choiceStatus()?.option === option)
      return;

    this.textDelay.set(0);

    if (isCorrect) {
      this.choiceStatus.set({ option, isCorrect: true });
      this.feedbackKey.set(correctFeedback);
      this.nextPhase.set(nextPhase);

      if (nextPhase !== 'done') {
        this.showContinue.set(true);
      } else { // sorry for hard code
        this.bottomText.set('SCENES.GROUND_OZONE.CARS_FACTORIES.CORRECT_BOTTOMTEXT')
      }
      this.isTextComplete.set(false);
    } else {
      this.choiceStatus.set({ option, isCorrect: false });
      this.feedbackKey.set(incorrectFeedback);
      this.isTextComplete.set(false);
    }
  }

  onContinue() {
    this.fadeState.set('out');
    this.isTextComplete.set(false);

    const t = setTimeout(() => {
      this.showContinue.set(false);
      this.feedbackKey.set(null);
      this.currentChoice.set(this.nextPhase()!);
      this.choiceStatus.set(null);
      this.nextPhase.set(null);
      this.fadeState.set('in');
    }, 500);

    this.destroyRef.onDestroy(() => clearTimeout(t));
  }

  selectArea(area: 'urban' | 'rural') {
    this.handleSelection(
      area,
      area === 'urban',
      'season',
      'SCENES.GROUND_OZONE.AREA.CORRECT',
      'SCENES.GROUND_OZONE.AREA.INCORRECT',
    );
  }

  selectSeason(season: 'warm' | 'cool') {
    this.handleSelection(
      season,
      season === 'warm',
      'density',
      'SCENES.GROUND_OZONE.SEASON.CORRECT',
      'SCENES.GROUND_OZONE.SEASON.INCORRECT',
    );
  }

  selectDensity(density: 'lots' | 'few') {
    this.handleSelection(
      density,
      density === 'lots',
      'done',
      'SCENES.GROUND_OZONE.CARS_FACTORIES.CORRECT',
      'SCENES.GROUND_OZONE.CARS_FACTORIES.INCORRECT',
    );
  }

  onNarrativeCompleted() {
    this.isTextComplete.set(true);
    if (this.currentChoice() === 'done' || this.nextPhase() === 'done') {
      this.story.setSceneCompleted(true);
    }
  }

  getOptionStatus(option: string) {
    const status = this.choiceStatus();
    if (status?.option === option) {
      return status.isCorrect ? 'correct' : 'incorrect';
    }
    return '';
  }
}

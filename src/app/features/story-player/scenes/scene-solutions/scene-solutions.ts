import { Component, computed, inject, signal } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { StoryService } from '@core/story.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { GrassRoadComponent } from '@shared/ui/backgrounds/grass-road/grass-road.component';

export interface SolutionOption {
  id: string;
  isCorrect: boolean;
}

export interface Situation {
  id: string;
  image: string;
  alt: string;
  top: string;
  left: string;
  height?: string;
  options: SolutionOption[];
}

@Component({
  selector: 'app-scene-solutions',
  imports: [NarrativeText, TranslateModule, LayerWrapper, GrassRoadComponent, CdkTrapFocus],
  templateUrl: './scene-solutions.html',
  styleUrl: './scene-solutions.scss',
})
export class SceneSolutions {
  story = inject(StoryService);
  translate = inject(TranslateService);
  REQUIRED_CHOICES_TO_FINISH = 4;

  situations: Situation[] = [
    {
      id: 'SITUATION_ENERGY',
      image: 'solutions/windmill.png',
      alt: 'windmill',
      top: '25%',
      left: '10%',
      height: '30vh',
      options: [
        { id: 'RENEWABLE_ENERGY', isCorrect: true },
        { id: 'FOSSIL_FUELS', isCorrect: false },
      ],
    },
    {
      id: 'SITUATION_PRODUCTS',
      image: 'ingredient-gathering/paint.webp',
      alt: 'paint buckets',
      top: '30%',
      left: '30%',
      height: '15vh',
      options: [
        { id: 'HIGH_VOC_PRODUCTS', isCorrect: false },
        { id: 'LOW_VOC_PRODUCTS', isCorrect: true },
      ],
    },
    {
      id: 'SITUATION_FIRE',
      image: 'solutions/wood-stove.png',
      alt: 'wood stove',
      top: '15%',
      left: '75%',
      height: '20vh',
      options: [
        { id: 'FORGO_FIRE', isCorrect: true },
        { id: 'BURN_WOOD', isCorrect: false },
      ],
    },
    {
      id: 'SITUATION_YARD',
      image: 'solutions/compost.png',
      alt: 'compost',
      top: '20%',
      left: '90%',
      height: '20vh',
      options: [
        { id: 'COMPOST_YARD_WASTE', isCorrect: true },
        { id: 'BURN_TRASH', isCorrect: false },
      ],
    },
    {
      id: 'SITUATION_USAGE',
      image: 'solutions/power-outlet.png',
      alt: 'power outlets',
      top: '45%',
      left: '70%',
      height: '15vh',
      options: [
        { id: 'LEAVE_LIGHTS_ON', isCorrect: false },
        { id: 'LESS_ENERGY', isCorrect: true },
      ],
    },
    {
      id: 'SITUATION_MOWING',
      image: 'solutions/lawnmower.png',
      alt: 'lawnmower',
      top: '65%',
      left: '88%',
      height: '20vh',
      options: [
        { id: 'MOW_MORNING', isCorrect: false },
        { id: 'MOW_EVENING', isCorrect: true },
      ],
    },
    {
      id: 'SITUATION_VEHICLE',
      image: 'solutions/electric-car.png',
      alt: 'car',
      top: '90%',
      left: '20%',
      height: '25vh',
      options: [
        { id: 'LOW_POLLUTION_VEHICLE', isCorrect: true },
        { id: 'HIGH_POLLUTION_VEHICLE', isCorrect: false },
      ],
    },
    {
      id: 'SITUATION_TRANSPORT',
      image: 'vehicles/vehicle_bus.png',
      alt: 'bus',
      top: '100%',
      left: '50%',
      height: '30vh',
      options: [
        { id: 'DRIVE_EVERYWHERE', isCorrect: false },
        { id: 'WALK_BIKE_BUS', isCorrect: true },
      ],
    },
    {
      id: 'SITUATION_REFUEL',
      image: 'vehicles/oil.png',
      alt: 'oil',
      top: '100%',
      left: '70%',
      height: '25vh',
      options: [
        { id: 'REFUEL_EVENING', isCorrect: true },
        { id: 'REFUEL_DAY', isCorrect: false },
      ],
    },
  ];

  activeSituationId = signal<string | null>(null);
  activeSituation = computed(() => this.situations.find((s) => s.id === this.activeSituationId()));

  // Map tracking which option ID was chosen for which situation
  selections = signal<Map<string, string>>(new Map());

  correctSelectedCount = computed(() => {
    let count = 0;
    this.selections().forEach((optionId, situationId) => {
      const situation = this.situations.find((s) => s.id === situationId);
      if (situation) {
        const option = situation.options.find((o) => o.id === optionId);
        if (option?.isCorrect) count++;
      }
    });
    return count;
  });

  incorrectSelectedCount = computed(() => {
    let count = 0;
    this.selections().forEach((optionId, situationId) => {
      const situation = this.situations.find((s) => s.id === situationId);
      if (situation) {
        const option = situation.options.find((o) => o.id === optionId);
        if (option && !option.isCorrect) count++;
      }
    });
    return count;
  });

  // Smog calculation based on correct/incorrect choices
  smogOpacity = computed(() => {
    const totalSituations = this.situations.length;
    const reduction = this.correctSelectedCount() / totalSituations;
    const penalty = this.incorrectSelectedCount() * (1 / totalSituations);

    // Start at 1.0 (heavy smog), go down for correct, back up for incorrect
    const opacity = 1 - reduction + penalty;

    // Keep it bound between 0 (clear sky) and 1 (heavy smog)
    return Math.max(0, Math.min(1, opacity));
  });

  userFinished = signal(false);

  // The scene is done once every situation has a selected option or if the user manually finished
  allSituationsAnswered = computed(() => {
    return this.selections().size === this.situations.length || this.userFinished();
  });

  isDone = computed(() => {
    return this.allSituationsAnswered() && this.activeSituationId() === null;
  });

  finishScene() {
    if (this.selections().size > 0) {
      this.userFinished.set(true);
      this.activeSituationId.set(null);
    }
  }

  // controls what is displayed in the narrative text
  currentNarrativeKey = computed(() => {
    if (!this.isDone()) {
      return 'SCENES.SOLUTIONS.PROMPT';
    }

    if (this.incorrectSelectedCount() === 0) {
      return 'SCENES.SOLUTIONS.CONCLUSION_PERFECT';
    } else if (this.correctSelectedCount() === 0) {
      return 'SCENES.SOLUTIONS.CONCLUSION_ALL_INCORRECT';
    } else {
      return 'SCENES.SOLUTIONS.CONCLUSION_MIXED';
    }
  });

  // to be passed into the translation at the end for how many correct/incorrect
  currentNarrativeParams = computed(() => {
    if (!this.isDone()) {
      return {};
    }
    return {
      correctCount: this.correctSelectedCount(),
      incorrectCount: this.incorrectSelectedCount(),
    };
  });

  isAnswered(situationId: string): boolean {
    return this.selections().has(situationId);
  }

  isAnsweredCorrectly(situationId: string): boolean {
    const selectedOptionId = this.selections().get(situationId);
    if (!selectedOptionId) return false;
    const situation = this.situations.find((s) => s.id === situationId)!;
    const option = situation.options.find((o) => o.id === selectedOptionId)!;
    return option.isCorrect;
  }

  toggleSituation(situationId: string) {
    if (this.allSituationsAnswered()) return;

    if (this.activeSituationId() === situationId) {
      this.activeSituationId.set(null);
    } else {
      this.activeSituationId.set(situationId);
    }
  }

  takeAction(situationId: string, optionId: string) {
    this.selections.update((map) => {
      const newMap = new Map(map);
      newMap.set(situationId, optionId);
      return newMap;
    });
  }

  onFinalNarrativeCompleted() {
    if (this.isDone()) {
      this.story.setSceneCompleted(true);
    }
  }
}

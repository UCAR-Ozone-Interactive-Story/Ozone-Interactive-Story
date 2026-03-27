import { Component, computed, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@features/story-player/backgrounds/sky-grass/sky-grass.component';

export interface SolutionOption {
  id: string;
  isCorrect: boolean;
}

export interface Situation {
  id: string;
  image: string;
  top: string;
  left: string;
  options: SolutionOption[];
}

@Component({
  selector: 'app-scene-solutions',
  imports: [NarrativeText, TranslateModule, LayerWrapper, SkyGrassComponent],
  templateUrl: './scene-solutions.html',
  styleUrl: './scene-solutions.scss',
})
export class SceneSolutions {
  story = inject(StoryService);
  translate = inject(TranslateService);

  situations: Situation[] = [
    {
      id: 'SITUATION_VEHICLE',
      image: 'crappy_car.jpg',
      top: '100%', left: '20%',
      options: [
        { id: 'LOW_POLLUTION_VEHICLE', isCorrect: true },
        { id: 'DRIVE_EVERYWHERE', isCorrect: false }
      ]
    },
    {
      id: 'SITUATION_ENERGY',
      image: 'wind_turbine.jpg',
      top: '25%', left: '10%',
      options: [
        { id: 'RENEWABLE_ENERGY', isCorrect: true },
        { id: 'FOSSIL_FUELS', isCorrect: false }
      ]
    },
    {
      id: 'SITUATION_PRODUCTS',
      image: '',
      top: '30%', left: '30%',
      options: [
        { id: 'HIGH_VOC_PRODUCTS', isCorrect: false },
        { id: 'LOW_VOC_PRODUCTS', isCorrect: true }
      ]
    },
    {
      id: 'SITUATION_USAGE',
      image: '',
      top: '45%', left: '70%',
      options: [
        { id: 'LEAVE_LIGHTS_ON', isCorrect: false },
        { id: 'LESS_ENERGY', isCorrect: true }
      ]
    },
    {
      id: 'SITUATION_FIRE',
      image: 'wood_stove.jpg',
      top: '20%', left: '85%',
      options: [
        { id: 'FORGO_FIRE', isCorrect: true },
        { id: 'BURN_WOOD', isCorrect: false }
      ]
    },
    {
      id: 'SITUATION_YARD',
      image: 'compost.jpg',
      top: '40%', left: '90%',
      options: [
        { id: 'COMPOST_YARD_WASTE', isCorrect: true },
        { id: 'BURN_TRASH', isCorrect: false }
      ]
    },
    {
      id: 'SITUATION_MOWING',
      image: 'push_mower.jpg',
      top: '65%', left: '88%',
      options: [
        { id: 'MOW_MORNING', isCorrect: false },
        { id: 'MOW_EVENING', isCorrect: true }
      ]
    },
    {
      id: 'SITUATION_REFUEL',
      image: 'gas_pump.jpg',
      top: '100%', left: '80%',
      options: [
        { id: 'REFUEL_EVENING', isCorrect: true },
        { id: 'REFUEL_DAY', isCorrect: false }
      ]
    },
    {
      id: 'SITUATION_TRANSPORT',
      image: 'bike_bus.jpg',
      top: '100%', left: '50%',
      options: [
        { id: 'IDLE_ENGINE', isCorrect: false },
        { id: 'WALK_BIKE_BUS', isCorrect: true }
      ]
    }
  ];

  activeSituationId = signal<string | null>(null);
  activeSituation = computed(() => this.situations.find(s => s.id === this.activeSituationId()));

  // Map tracking which option ID was chosen for which situation
  selections = signal<Map<string, string>>(new Map());

  correctSelectedCount = computed(() => {
    let count = 0;
    this.selections().forEach((optionId, situationId) => {
      const situation = this.situations.find(s => s.id === situationId);
      if (situation) {
        const option = situation.options.find(o => o.id === optionId);
        if (option?.isCorrect) count++;
      }
    });
    return count;
  });

  incorrectSelectedCount = computed(() => {
    let count = 0;
    this.selections().forEach((optionId, situationId) => {
      const situation = this.situations.find(s => s.id === situationId);
      if (situation) {
        const option = situation.options.find(o => o.id === optionId);
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

  // The scene is done once every situation has a selected option
  allSituationsAnswered = computed(() => {
    return this.selections().size === this.situations.length;
  });

  isDone = computed(() => {
    return this.allSituationsAnswered() && this.activeSituationId() === null;
  });

  currentNarrativeKey = computed(() => {
    if (!this.isDone()) {
      return 'SCENES.SOLUTIONS.PROMPT';
    }

    if (this.incorrectSelectedCount() === 0) {
      return 'SCENES.SOLUTIONS.CONCLUSION_PERFECT';
    } else {
      return 'SCENES.SOLUTIONS.CONCLUSION_MIXED';
    }
  });

  currentNarrativeParams = computed(() => {
    return {
      correctCount: this.correctSelectedCount(),
      incorrectCount: this.incorrectSelectedCount()
    };
  });

  isSituationCorrect(situationId: string): boolean {
    const selectedOptionId = this.selections().get(situationId);
    if (!selectedOptionId) return false;
    const situation = this.situations.find(s => s.id === situationId);
    const option = situation?.options.find(o => o.id === selectedOptionId);
    return !!option?.isCorrect;
  }

  isSituationIncorrect(situationId: string): boolean {
    const selectedOptionId = this.selections().get(situationId);
    if (!selectedOptionId) return false;
    const situation = this.situations.find(s => s.id === situationId);
    const option = situation?.options.find(o => o.id === selectedOptionId);
    return option !== undefined && !option.isCorrect;
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
    this.selections.update(map => {
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
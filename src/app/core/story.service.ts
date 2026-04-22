import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { SceneMorning } from '@features/story-player/scenes/scene-morning/scene-morning';
import { SceneVehicleTypes } from '@features/story-player/scenes/scene-vehicle-types/scene-vehicle-types';
import { Scene } from './scene';
import { SceneSunnyDay } from '@features/story-player/scenes/scene-sunny-day/scene-sunny-day';
import { SceneAir } from '@features/story-player/scenes/scene-air/scene-air';
import { SceneBurningFuels } from '@features/story-player/scenes/scene-burning-fuels/scene-burning-fuels';
import { SceneNearbyFactories } from '@features/story-player/scenes/scene-nearby-factories/scene-nearby-factories';
import { SceneOzoneMolecule } from '@features/story-player/scenes/scene-ozone-molecule/scene-ozone-molecule';
import { SceneGatherIngredients } from '@features/story-player/scenes/scene-gather-ingredients/scene-gather-ingredients';
import { SceneEnd } from '@features/story-player/scenes/scene-end/scene-end';
import { SceneUpperOzone } from '@features/story-player/scenes/scene-upper-ozone/scene-upper-ozone';
import { SceneAirPollution } from '@features/story-player/scenes/scene-air-pollution/scene-air-pollution';
import { SceneHealthImpacts } from '@features/story-player/scenes/scene-health-impacts/scene-health-impacts';
import { SceneGroundOzone } from '@features/story-player/scenes/scene-ground-ozone/scene-ground-ozone';
import { SceneSolutions } from '@features/story-player/scenes/scene-solutions/scene-solutions';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
/**
 * Provides data about story progress to any component that needs it
 * @example
 * story = inject(StoryService);
 */
@Injectable({ providedIn: 'root' })
export class StoryService {
  // immutable definition for all scenes, if needed this could be moved elsewhere
  // static makes this kind of ugly but I don't want it changed -- just refer to these by id/index
  private static readonly SCENE_DEFINITIONS: Scene[] = [
    {
      id: 'morning',
      i18n_title: 'SCENES.MORNING.TITLE',
      component: SceneMorning,
    },
    {
      id: 'vehicle-types',
      i18n_title: 'SCENES.VEHICLE_TYPES.TITLE',
      component: SceneVehicleTypes,
    },
    {
      id: 'nearby-factories',
      i18n_title: 'SCENES.NEARBY_FACTORIES.TITLE',
      component: SceneNearbyFactories,
    },
    {
      id: 'burning-fuels',
      i18n_title: 'SCENES.BURNING_FUELS.TITLE',
      component: SceneBurningFuels,
    },
    {
      id: 'air',
      i18n_title: 'SCENES.AIR.TITLE',
      component: SceneAir,
    },

    {
      id: 'air-pollution',
      i18n_title: 'SCENES.AIR_POLLUTION.TITLE',
      component: SceneAirPollution,
    },
    {
      id: 'health-impacts',
      i18n_title: 'SCENES.HEALTH_IMPACTS.TITLE',
      component: SceneHealthImpacts,
    },
    {
      id: 'sunny-day',
      i18n_title: 'SCENES.SUNNY_DAY.TITLE',
      component: SceneSunnyDay,
    },
    {
      id: 'gather-ingredients',
      i18n_title: 'SCENES.GATHER_INGREDIENTS.TITLE',
      component: SceneGatherIngredients,
    },
    {
      id: 'ozone-molecule',
      i18n_title: 'SCENES.OZONE_MOLECULE.TITLE',
      component: SceneOzoneMolecule,
    },
    {
      id: 'upper-ozone',
      i18n_title: 'SCENES.UPPER_OZONE.TITLE',
      component: SceneUpperOzone,
    },
    {
      id: 'ground-ozone',
      i18n_title: 'SCENES.GROUND_OZONE.TITLE',
      component: SceneGroundOzone,
    },
    {
      id: 'scene-solutions',
      i18n_title: 'SCENES.SOLUTIONS.TITLE',
      component: SceneSolutions,
    },
    {
      id: 'end-scene',
      i18n_title: 'SCENES.END.TITLE',
      component: SceneEnd,
    },
  ];

  private titleService: Title = inject(Title);
  private currentIndex = signal(0);
  private previousIndex = signal<number | null>(null);
  private unlockedScenes = signal(new Set<string>());
  private sceneCompleted = signal(false);
  private isTransitioningSignal = signal(false);

  private readonly STORAGE_KEY_INDEX = 'story.currentIndex';
  private readonly STORAGE_KEY_UNLOCKED = 'story.unlockedScenes';

  currentScene = computed(() => StoryService.SCENE_DEFINITIONS[this.currentIndex()]);
  scenes = computed(() =>
    StoryService.SCENE_DEFINITIONS.filter((s) => this.unlockedScenes().has(s.id)),
  );
  isSceneCompleted = computed(() => this.sceneCompleted());
  currentIndexValue = computed(() => this.currentIndex());
  isTransitioning = computed(() => this.isTransitioningSignal());
  totalScenes = StoryService.SCENE_DEFINITIONS.length;

  constructor() {
    this.loadFromStorage();
  }
  focusOnDialog() {
    setTimeout(() => {
      const dialogBox = document.getElementsByClassName('dialog-box').item(0);
      if (dialogBox instanceof HTMLElement) {
        dialogBox.focus({ preventScroll: true });
      }
    }, 500);
  }
  focusOnSceneContainer() {
    setTimeout(() => {
      const container = document.getElementsByClassName('scene-container').item(0);
      if (container instanceof HTMLElement) {
        if (this.transition().textDelay > 0) {
          setTimeout(() => {
            container.focus({ preventScroll: true });
          }, this.transition().textDelay);
        } else {
          container.focus({ preventScroll: true });
        }
      }
    });
  }

  //   setTitleToTranslation() {
  //     this.titleService.setTitle(this.currentScene().i18n_title | translate);
  //   }
  // move to next scene
  nextScene() {
    if (this.currentIndex() < StoryService.SCENE_DEFINITIONS.length - 1) {
      this.previousIndex.set(this.currentIndex());
      this.isTransitioningSignal.set(true);
      this.currentIndex.update((i) => i + 1);
      this.unlockScene(this.currentScene().id);
      this.sceneCompleted.set(false);
      this.saveIndex();
      //   this.setTitleToTranslation();
      this.focusOnSceneContainer();
    }
  }

  // move to previous scene
  prevScene() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      this.sceneCompleted.set(false);
      this.saveIndex();
      //   this.setTitleToTranslation();
      this.focusOnDialog();
    }
  }

  setSceneCompleted(completed: boolean) {
    this.sceneCompleted.set(completed);
  }

  // jump to specific scene by scene id
  jumpTo(sceneId: string, unlock = true) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    if (index > -1) {
      this.previousIndex.set(this.currentIndex());
      this.isTransitioningSignal.set(true);
      this.currentIndex.set(index);
      if (unlock) this.unlockScene(sceneId);
      this.sceneCompleted.set(false);
      this.saveIndex();
      //   this.setTitleToTranslation();
      this.focusOnSceneContainer();
    }
  }

  unlockScene(sceneId: string) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    if (index > -1) {
      this.unlockedScenes.update((x) => new Set([...x, sceneId]));
      console.log('now scenes: ', this.unlockedScenes());
      this.saveUnlocked();
    }
  }

  private loadFromStorage() {
    try {
      const savedIndex = localStorage.getItem(this.STORAGE_KEY_INDEX);
      const savedUnlocked = localStorage.getItem(this.STORAGE_KEY_UNLOCKED);

      if (savedIndex !== null) {
        const index = Number(savedIndex);
        if (!Number.isNaN(index)) {
          this.currentIndex.set(
            Math.min(Math.max(index, 0), StoryService.SCENE_DEFINITIONS.length - 1),
          );
        }
      }

      if (savedUnlocked) {
        this.unlockedScenes.set(new Set(JSON.parse(savedUnlocked)));
      }

      this.unlockScene(this.currentScene().id);
      this.jumpTo(this.currentScene().id);
    } catch (err) {
      console.warn('Failed to restore story progress', err);
    }
  }

  private saveIndex() {
    localStorage.setItem(this.STORAGE_KEY_INDEX, String(this.currentIndex()));
  }

  private saveUnlocked() {
    localStorage.setItem(this.STORAGE_KEY_UNLOCKED, JSON.stringify([...this.unlockedScenes()]));
  }

  resetProgress() {
    console.log('[StoryService] Resetting story progress');

    // clear signals
    this.currentIndex.set(0);
    this.unlockedScenes.set(new Set([this.currentScene().id]));

    // clear storage
    localStorage.removeItem('story.currentIndex');
    localStorage.removeItem('story.unlockedScenes');
  }

  previousScene = computed(() =>
    this.previousIndex() !== null ? StoryService.SCENE_DEFINITIONS[this.previousIndex()!] : null,
  );

  // list of transitions defined by which scenes are being moved between
  // animationType is defined in story-player.scss and referenced in story-player.html
  private static readonly TRANSITIONS: Record<string, TransitionConfig> = {
    'morning->vehicle-types': {
      animationType: 'slide-up',
      textDelay: 3100,
      duration: 3000,
    },
    'nearby-factories->burning-fuels': {
      animationType: 'slide-left',
      textDelay: 4010,
      duration: 4000,
    },
    'burning-fuels->air': {
      animationType: 'slide-left',
      textDelay: 4010,
      duration: 4000,
    },
    'air->air-pollution': {
      animationType: 'slide-right',
      textDelay: 4010,
      duration: 4000,
    },
    'air-pollution->health-impacts': {
      animationType: 'slide-right',
      textDelay: 4010,
      duration: 4000,
    },
    'health-impacts->sunny-day': {
      animationType: 'slide-down',
      textDelay: 3010,
      duration: 3000,
    },
    'gather-ingredients->ozone-molecule': {
      animationType: 'slide-down',
      textDelay: 3010,
      duration: 3000,
    },
    'ozone-molecule->upper-ozone': {
      animationType: 'slide-down',
      textDelay: 3010,
      duration: 3000,
    },
  };

  transition = computed<TransitionConfig>(() => {
    const prev = this.previousScene()?.id;
    const curr = this.currentScene().id;
    const key = `${prev}->${curr}`;

    return (
      // default transition is a 1-second fade with 0.2-second text delay
      StoryService.TRANSITIONS[key] ?? {
        animationType: 'fade',
        textDelay: 1200,
        duration: 1000,
      }
    );
  });

  finishTransition() {
    this.previousIndex.set(null);
    this.isTransitioningSignal.set(false);
  }

  // handle the fade from the starting home screen
  startInitialTransition() {
    this.previousIndex.set(null);
    this.isTransitioningSignal.set(true);
  }
}

// animationType: all transitions are included here by name to be selected from above
// textDelay: tell how long after the animation *starts* that the text should begin showing
// intermediate: optional, describe an image to be shown between two scenes during a slide
//               note that this feature is unused; the trouble arises from creating an
//               intermediate image that could account for different screen sizes
interface TransitionConfig {
  animationType: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  textDelay: number;
  duration?: number;
  intermediate?: string;
}

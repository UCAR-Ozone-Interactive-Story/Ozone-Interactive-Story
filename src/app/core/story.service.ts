import { isPlatformBrowser } from '@angular/common';
import { computed, Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { SceneMorning } from '@features/story-player/scenes/scene-morning/scene-morning';
import { SceneVehicleTypes } from '@features/story-player/scenes/scene-vehicle-types/scene-vehicle-types';
import { Scene } from './scene';
import { SceneSunnyDay } from '@features/story-player/scenes/scene-sunny-day/scene-sunny-day';
import { SceneAir } from '@features/story-player/scenes/scene-air/scene-air';
import { SceneBurningFuels } from '@features/story-player/scenes/scene-burning-fuels/scene-burning-fuels';
import { SceneNearbyFactories } from '@features/story-player/scenes/scene-nearby-factories/scene-nearby-factories';
import { SceneGatherIngredients } from '@features/story-player/scenes/scene-gather-ingredients/scene-gather-ingredients';
import { SceneOzoneIngredients } from '@features/story-player/scenes/scene-ozone-ingredients/scene-ozone-ingredients';

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
      id: 'sunny-day',
      i18n_title: 'SCENES.SUNNY_DAY.TITLE',
      component: SceneSunnyDay,
    },
    {
      id: 'air',
      i18n_title: 'SCENES.AIR.TITLE',
      component: SceneAir,
    },
    {
      id: 'burning-fuels',
      i18n_title: 'SCENES.BURNING_FUELS.TITLE',
      component: SceneBurningFuels,
    },
    {
      id: 'ozone-ingredients',
      i18n_title: 'SCENES.OZONE.TITLE',
      component: SceneOzoneIngredients,
    },
    {
      id: 'gather-ingredients',
      i18n_title: 'SCENES.GATHER_INGREDIENTS.TITLE',
      component: SceneGatherIngredients,
    },
  ];

  private currentIndex = signal(0);
  private unlockedScenes = signal(new Set<string>());

  private readonly STORAGE_KEY_INDEX = 'story.currentIndex';
  private readonly STORAGE_KEY_UNLOCKED = 'story.unlockedScenes';

  currentScene = computed(() => StoryService.SCENE_DEFINITIONS[this.currentIndex()]);
  scenes = computed(() =>
    StoryService.SCENE_DEFINITIONS.filter((s) => this.unlockedScenes().has(s.id)),
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    } else {
      console.log('[StoryService] skipping localStorage');
    }
  }

  // move to next scene
  nextScene() {
    if (this.currentIndex() < StoryService.SCENE_DEFINITIONS.length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.unlockScene(this.currentScene().id);
      this.saveIndex();
    }
  }

  // jump to specific scene by scene id
  jumpTo(sceneId: string, unlock: boolean = true) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    if (index > -1) {
      this.currentIndex.set(index);
      if (unlock) this.unlockScene(sceneId);
      this.saveIndex();
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
    this.unlockedScenes.set(new Set());

    // clear storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('story.currentIndex');
      localStorage.removeItem('story.unlockedScenes');
    }
  }
}

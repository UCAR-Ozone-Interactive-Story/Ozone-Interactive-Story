import { computed, Injectable, OnDestroy, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SceneMorning } from '@features/story-player/scenes/scene-morning/scene-morning';
import { SceneVehicleTypes } from '@features/story-player/scenes/scene-vehicle-types/scene-vehicle-types';
import { Scene } from './scene';
import { SceneSunnyDay } from '@features/story-player/scenes/scene-sunny-day/scene-sunny-day';
import { SceneAir } from '@features/story-player/scenes/scene-air/scene-air';
import { SceneBurningFuels } from '@features/story-player/scenes/scene-burning-fuels/scene-burning-fuels';
import { SceneNearbyFactories } from '@features/story-player/scenes/scene-nearby-factories/scene-nearby-factories';

/**
 * Provides data about story progress to any component that needs it
 * @example
 * story = inject(StoryService);
 */
@Injectable({ providedIn: 'root' })
export class StoryService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'story_progress';

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
      component: SceneSunnyDay
    },
    {
      id: 'air',
      i18n_title: 'SCENES.AIR.TITLE',
      component: SceneAir
    },
    {
      id: 'burning-fuels',
      i18n_title: 'SCENES.BURNING_FUELS.TITLE',
      component: SceneBurningFuels,
    },
  ];

  private currentIndex = signal(0);
  private unlockedScenes = signal(new Set<string>());

  currentScene = computed(() => StoryService.SCENE_DEFINITIONS[this.currentIndex()]);
  scenes = computed(() =>
    StoryService.SCENE_DEFINITIONS.filter((s) => this.unlockedScenes().has(s.id)),
  );

  constructor() {
    // Load state immediately on service initialization
    this.loadState();

    // Auto-persist changes to signals whenever they change
    effect(() => {
      this.saveState();
    });
  }

  ngOnDestroy(): void {
    this.saveState();
  }

  private loadState() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.currentIndex !== undefined) {
            this.currentIndex.set(data.currentIndex);
          }
          if (data.unlockedScenes) {
            this.unlockedScenes.set(new Set(data.unlockedScenes));
          }
          console.log('StoryService: State loaded. Current index:', this.currentIndex());
        } catch (e) {
          console.error('Error loading story progress from localStorage', e);
        }
      } else {
        // First run or cleared: unlock the first scene
        this.unlockScene(StoryService.SCENE_DEFINITIONS[0].id);
      }
    }
  }

  private saveState() {
    if (isPlatformBrowser(this.platformId)) {
      const data = {
        currentIndex: this.currentIndex(),
        unlockedScenes: Array.from(this.unlockedScenes())
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }
  }

  // move to next scene
  nextScene() {
    if (this.currentIndex() < StoryService.SCENE_DEFINITIONS.length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.unlockScene(this.currentScene().id);
    }
  }

  // jump to specific scene by scene id
  jumpTo(sceneId: string, unlock: boolean = true) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    if (index > -1) {
      this.currentIndex.set(index);
      if (unlock) this.unlockScene(sceneId);
    }
  }

  unlockScene(sceneId: string) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    if (index > -1) {
      this.unlockedScenes.update((x) => new Set([...x, sceneId]));
    }
  }
}

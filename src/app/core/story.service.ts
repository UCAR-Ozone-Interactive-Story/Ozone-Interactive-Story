import { computed, Injectable, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SceneMorning } from '@features/story-player/scenes/scene-morning/scene-morning';
import { SceneVehicleTypes } from '@features/story-player/scenes/scene-vehicle-types/scene-vehicle-types';
import { Scene } from './scene';
import { SceneSunnyDay } from '@features/story-player/scenes/scene-sunny-day/scene-sunny-day';
import { SceneNearbyFactories } from '@features/story-player/scenes/scene-nearby-factories/scene-nearby-factories';

/**
 * Provides data about story progress to any component that needs it
 * @example
 * story = inject(StoryService);
 */
@Injectable({ providedIn: 'root' })
export class StoryService implements OnInit, OnDestroy {
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
      id: 'sunny-day',
      i18n_title: 'SCENES.SUNNY_DAY.TITLE',
      component: SceneSunnyDay,
    },
    {
      id: 'nearby-factories',
      i18n_title: 'SCENES.NEARBY_FACTORIES.TITLE',
      component: SceneNearbyFactories,
    },
  ];

  private currentIndex = signal(0);
  private unlockedScenes = signal(new Set<string>());

  currentScene = computed(() => StoryService.SCENE_DEFINITIONS[this.currentIndex()]);
  scenes = computed(() =>
    StoryService.SCENE_DEFINITIONS.filter((s) => this.unlockedScenes().has(s.id)),
  );

  ngOnInit(): void {
    // load from localStorage here
  }
  ngOnDestroy(): void {
    // save to localStorage here
  }

  // move to next scene
  nextScene() {
    console.log('nextScene');
    if (this.currentIndex() < StoryService.SCENE_DEFINITIONS.length - 1) {
      this.currentIndex.update((i) => i + 1);
      this.unlockScene(this.currentScene().id);
    }
  }

  // jump to specific scene by scene id
  jumpTo(sceneId: string, unlock: boolean = true) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    console.log('jumpTo: ', index);
    if (index > -1) {
      this.currentIndex.set(index);
      if (unlock) this.unlockScene(sceneId);
    }
  }

  unlockScene(sceneId: string) {
    const index = StoryService.SCENE_DEFINITIONS.findIndex((s) => s.id === sceneId);
    console.log('unlock: ', index);
    if (index > -1) {
      this.unlockedScenes.update((x) => new Set([...x, sceneId]));
      console.log('now scenes: ', this.unlockedScenes());
    }
  }
}

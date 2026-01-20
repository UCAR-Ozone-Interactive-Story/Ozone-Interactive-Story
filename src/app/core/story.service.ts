import { Injectable, signal, computed } from '@angular/core';
import { Scene } from './scene';
import { SceneMorning } from '@features/story-player/scenes/scene-morning/scene-morning';
import { SceneVehicleTypes } from '@features/story-player/scenes/scene-vehicle-types/scene-vehicle-types';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private scenes: Scene[] = [
    {
      id: 'morning',
      i18n: 'scene.morning',
      component: SceneMorning,
    },
    {
      id: 'vehicle-types',
      i18n: 'scene.vehicle-types',
      component: SceneVehicleTypes,
    },
  ];

  private currentIndex = signal(0);
  private _scenes = signal(this.scenes);

  currentScene = computed(() => this.scenes[this.currentIndex()]);
  allScenes = this._scenes.asReadonly();

  next() {
    if (this.currentIndex() < this.scenes.length - 1) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  // Jump to specific scene (e.g., after quiz branch)
  jumpTo(sceneId: string) {
    const index = this.scenes.findIndex((s) => s.id === sceneId);
    if (index > -1) this.currentIndex.set(index);
  }
}

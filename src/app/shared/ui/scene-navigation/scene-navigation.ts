import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { StoryService } from '@core/story.service';

@Component({
  selector: 'app-scene-navigation',
  imports: [CommonModule],
  templateUrl: './scene-navigation.html',
  styleUrl: './scene-navigation.scss',
})
export class SceneNavigation {
  story = inject(StoryService);

  canGoPrevious = computed(() => this.story.currentIndexValue() > 0);
  canGoNext = computed(() => this.story.isSceneCompleted() && this.story.currentIndexValue() < this.story.totalScenes - 1);

  goToPrevious() {
    this.story.prevScene();
  }

  goToNext() {
    this.story.nextScene();
  }
}
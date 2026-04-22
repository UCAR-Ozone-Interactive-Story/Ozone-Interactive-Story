import { NgComponentOutlet } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { StoryService } from '@core/story.service';
import { Navbar } from '@shared/ui/navbar/navbar';
import { SceneNavigation } from '@shared/ui/scene-navigation/scene-navigation';

@Component({
  selector: 'app-story-player',
  imports: [Navbar, NgComponentOutlet, SceneNavigation],
  templateUrl: './story-player.html',
  styleUrl: './story-player.scss',
})
export class StoryPlayer implements OnInit {
  service = inject(StoryService);

  ngOnInit(): void {
    console.log('[StoryPlayer] Loaded. Current scene ->', this.service.currentScene().id);
    this.service.startInitialTransition();
  }

  get transitionClass(): string {
    return this.service.transition().animationType;
  }

  get isTransitioning(): boolean {
    return this.service.isTransitioning();
  }

  private transitionTimeout: any;
  ngAfterViewChecked() {
    if (this.service.isTransitioning() && !this.transitionTimeout) {
      const duration = this.service.transition().duration ?? 1000;

      this.transitionTimeout = setTimeout(() => {
        this.service.finishTransition();
        this.transitionTimeout = null;
      }, duration);
    }
  }
}

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
    console.log(
      '[StoryPlayer] Loaded. Current scene ->',
      this.service.currentScene().id
    );
  }

  private animationMap: Record<
    string,
    { enter: string; leave: string }
  > = {
    'slide-left': {
      enter: 'slide-in-left',
      leave: 'slide-out-left',
    },
    'slide-down': {
      enter: 'slide-in-down',
      leave: 'slide-out-down',
    },
    'fade': {
      enter: 'fade-in',
      leave: 'fade-out',
    },
  };

  get enterAnimation(): string {
    const type = this.service.transition().animationType;
    return this.animationMap[type]?.enter ?? 'fade-in';
  }

  get leaveAnimation(): string {
    const type = this.service.transition().animationType;
    return this.animationMap[type]?.leave ?? 'fade-out';
  }
}

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
}

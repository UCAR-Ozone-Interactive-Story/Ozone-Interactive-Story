import { NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { Navbar } from '@shared/ui/navbar/navbar';

@Component({
  selector: 'app-story-player',
  imports: [Navbar, NgComponentOutlet],
  templateUrl: './story-player.html',
  styleUrl: './story-player.scss',
})
export class StoryPlayer {
  service = inject(StoryService);
}

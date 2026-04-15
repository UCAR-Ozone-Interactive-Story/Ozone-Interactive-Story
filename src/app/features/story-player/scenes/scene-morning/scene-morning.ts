import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-morning',
  imports: [NarrativeText],
  templateUrl: './scene-morning.html',
  styleUrl: './scene-morning.scss',
})
export class SceneMorning {
  story = inject(StoryService);
}

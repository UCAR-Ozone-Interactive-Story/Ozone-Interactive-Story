import { Component, inject, output, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
const sceneName = 'scene-end';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneEnd {
  story = inject(StoryService);
}

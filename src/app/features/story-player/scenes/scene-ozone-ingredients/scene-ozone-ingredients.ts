import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
const sceneName = 'scene-ozone-ingredients';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneOzoneIngredients {
  story = inject(StoryService);
}

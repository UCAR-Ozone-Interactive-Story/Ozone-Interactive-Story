import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
const sceneName = 'scene-nearby-factories';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText, TranslateModule],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneNearbyFactories {
  story = inject(StoryService);
}

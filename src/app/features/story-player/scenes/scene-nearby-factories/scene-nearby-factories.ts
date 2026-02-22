import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-nearby-factories',
  imports: [NarrativeText, TranslateModule],
  templateUrl: './scene-nearby-factories.html',
  styleUrl: './scene-nearby-factories.scss',
})
export class SceneNearbyFactories {
  story = inject(StoryService);
}

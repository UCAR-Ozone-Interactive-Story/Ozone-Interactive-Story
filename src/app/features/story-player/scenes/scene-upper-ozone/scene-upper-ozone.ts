import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-upper-ozone',
  imports: [NarrativeText, TranslateModule],
  templateUrl: './scene-upper-ozone.html',
  styleUrl: './scene-upper-ozone.scss',
})
export class SceneUpperOzone {
  story = inject(StoryService);
}

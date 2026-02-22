import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-morning',
  imports: [NarrativeText, TranslateModule],
  templateUrl: './scene-morning.html',
  styleUrl: './scene-morning.scss',
})
export class SceneMorning {
  story = inject(StoryService);
}

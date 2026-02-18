import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { SceneNavigation } from '@shared/ui/scene-navigation/scene-navigation';

@Component({
  selector: 'app-scene-morning',
  imports: [NarrativeText, TranslateModule, SceneNavigation],
  templateUrl: './scene-morning.html',
  styleUrl: './scene-morning.scss',
})
export class SceneMorning {
  story = inject(StoryService);
}

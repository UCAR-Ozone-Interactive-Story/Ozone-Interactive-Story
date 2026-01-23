import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { BackgroundComponent } from '@features/story-player/backgrounds/background/background.component';
import { SkyGrassComponent } from '@features/story-player/backgrounds/sky-grass/sky-grass.component';
import { Clouds } from '@features/story-player/foregrounds/clouds/clouds';

@Component({
  selector: 'app-scene-sunny-day',
  imports: [NarrativeText, TranslateModule, BackgroundComponent, SkyGrassComponent, Clouds],
  templateUrl: './scene-sunny-day.html',
  styleUrl: './scene-sunny-day.scss',
})
export class SceneSunnyDay {
  story = inject(StoryService);
}

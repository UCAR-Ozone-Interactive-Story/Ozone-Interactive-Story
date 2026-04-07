import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { Clouds } from '@features/story-player/foregrounds/clouds/clouds';
import { SunlessCity } from '@features/story-player/backgrounds/sunless-city/sunless-city.component';

@Component({
  selector: 'app-scene-sunny-day',
  imports: [NarrativeText, TranslateModule, LayerWrapper, SunlessCity, Clouds],
  templateUrl: './scene-sunny-day.html',
  styleUrl: './scene-sunny-day.scss',
})
export class SceneSunnyDay {
  story = inject(StoryService);
}

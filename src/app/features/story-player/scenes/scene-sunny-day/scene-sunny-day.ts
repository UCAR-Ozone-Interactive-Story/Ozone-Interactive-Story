import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { Clouds } from '@features/story-player/foregrounds/clouds/clouds';
import { CitySunComponent } from '@features/story-player/backgrounds/city-sun/city-sun.component';

@Component({
  selector: 'app-scene-sunny-day',
  imports: [NarrativeText, TranslateModule, LayerWrapper, CitySunComponent, Clouds],
  templateUrl: './scene-sunny-day.html',
  styleUrl: './scene-sunny-day.scss',
})
export class SceneSunnyDay {
  story = inject(StoryService);
}

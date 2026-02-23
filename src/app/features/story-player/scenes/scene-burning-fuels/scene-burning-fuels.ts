import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { SkyGrassComponent } from '@features/story-player/backgrounds/sky-grass/sky-grass.component';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-burning-fuels',
  imports: [NarrativeText, TranslateModule, SkyGrassComponent, LayerWrapper],
  templateUrl: './scene-burning-fuels.html',
  styleUrl: './scene-burning-fuels.scss',
})
export class SceneBurningFuels {
  story = inject(StoryService);

  isFactoryActive = signal(false);
  isCarActive = signal(false);

  activateFactory() {
    this.isFactoryActive.set(true);
  }

  activateCar() {
    this.isCarActive.set(true);
  }
}

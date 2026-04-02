import { Component, inject, signal, effect } from '@angular/core';
import { StoryService } from '@core/story.service';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { BurningFuelsComponent } from "@features/story-player/backgrounds/burning-fuels/burning-fuels.component";

@Component({
  selector: 'app-scene-burning-fuels', 
  imports: [NarrativeText, TranslateModule, LayerWrapper, BurningFuelsComponent],
  templateUrl: './scene-burning-fuels.html',
  styleUrl: './scene-burning-fuels.scss',
})
export class SceneBurningFuels {
  story = inject(StoryService);

  isFactoryActive = signal(false);
  isCarActive = signal(false);

  constructor() {
    effect(() => {
      if (this.isFactoryActive() && this.isCarActive()) {
        this.story.setSceneCompleted(true);
      }
    });
  }

  activateFactory() {
    this.isFactoryActive.set(true);
  }

  activateCar() {
    this.isCarActive.set(true);
  }
}

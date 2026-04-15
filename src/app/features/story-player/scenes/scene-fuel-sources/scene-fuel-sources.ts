import { Component, inject, signal, effect } from '@angular/core';
import { StoryService } from '@core/story.service';
import { UndergroundComponent } from '@shared/ui/backgrounds/underground/underground.component';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { setTabIndexOne } from '@shared/ui/narrative-text/setTabIndexOne';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-fuel-sources',
  imports: [NarrativeText, UndergroundComponent, LayerWrapper, setTabIndexOne],
  templateUrl: './scene-fuel-sources.html',
  styleUrl: './scene-fuel-sources.scss',
})
export class SceneFuelSources {
  story = inject(StoryService);

  isOilActive = signal(false);
  isCoalActive = signal(false);

  constructor() {
    effect(() => {
      if (this.isOilActive() && this.isCoalActive()) {
        this.story.setSceneCompleted(true);
      }
    });
  }

  activateOil() {
    this.isOilActive.set(true);
  }

  activateCoal() {
    this.isCoalActive.set(true);
  }
}

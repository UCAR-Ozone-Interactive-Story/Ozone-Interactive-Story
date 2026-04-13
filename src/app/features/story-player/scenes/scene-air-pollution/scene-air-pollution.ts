import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { BurningFuelsComponent } from "@shared/ui/backgrounds/burning-fuels/burning-fuels.component";

@Component({
  selector: 'app-scene-air-pollution',
  imports: [NarrativeText, TranslateModule, LayerWrapper, CommonModule, BurningFuelsComponent],
  templateUrl: './scene-air-pollution.html',
  styleUrl: './scene-air-pollution.scss',
})
export class SceneAirPollution {
  story = inject(StoryService);

  showSecondText = false;

  showNextText() {
    this.showSecondText = true;
  }
}
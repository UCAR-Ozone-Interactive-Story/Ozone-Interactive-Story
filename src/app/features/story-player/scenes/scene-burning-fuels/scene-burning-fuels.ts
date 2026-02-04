import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
const sceneName = 'scene-burning-fuels';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText, TranslateModule],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
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

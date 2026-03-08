import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-nearby-factories',
  imports: [NarrativeText, TranslateModule],
  templateUrl: './scene-nearby-factories.html',
  styleUrl: './scene-nearby-factories.scss',
})
export class SceneNearbyFactories {
  story = inject(StoryService);

  showFuel = signal(true);
  fuelClicked = signal(false);
  showOutput = signal(false);
  outputMoved = signal(false);

  clickFuel() {
    if (!this.fuelClicked()) {
      this.fuelClicked.set(true);
      // hide fuel after animation completes
      setTimeout(() => {
        this.showFuel.set(false);
        // spawn electricity and move it right
        this.showOutput.set(true);
        // mark scene complete when output is shown
        this.story.setSceneCompleted(true);
        setTimeout(() => this.outputMoved.set(true), 50);

      }, 1000);
    }
  }
}

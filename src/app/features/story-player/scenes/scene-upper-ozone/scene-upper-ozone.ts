import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

@Component({
  selector: 'app-scene-upper-ozone',
  imports: [NarrativeText],
  templateUrl: './scene-upper-ozone.html',
  styleUrl: './scene-upper-ozone.scss',
})
export class SceneUpperOzone {
  story = inject(StoryService);

  showSecondText = false;

  showNextText() {
    this.showSecondText = true;
  }
}

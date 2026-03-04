import { Component, inject } from '@angular/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { StoryService } from '@core/story.service';

@Component({
  selector: 'app-scene-vehicle-types',
  imports: [NarrativeText],
  templateUrl: './scene-vehicle-types.html',
  styleUrl: './scene-vehicle-types.scss',
})
export class SceneVehicleTypes {
  story = inject(StoryService);
}

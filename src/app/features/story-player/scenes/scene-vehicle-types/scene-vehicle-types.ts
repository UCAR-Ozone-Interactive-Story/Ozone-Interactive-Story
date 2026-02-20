import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { StoryService } from '@core/story.service';
import { SceneNavigation } from '@shared/ui/scene-navigation/scene-navigation';

@Component({
  selector: 'app-scene-vehicle-types',
  imports: [NarrativeText, TranslateModule, SceneNavigation],
  templateUrl: './scene-vehicle-types.html',
  styleUrl: './scene-vehicle-types.scss',
})
export class SceneVehicleTypes {
  story = inject(StoryService);
}

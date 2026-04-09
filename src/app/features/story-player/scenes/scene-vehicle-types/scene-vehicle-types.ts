import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { StoryService } from '@core/story.service';
import { LayerWrapper } from "@features/story-player/layer-wrapper/layer-wrapper.component";
import { StreetComponent } from "@features/story-player/backgrounds/street/street.component";

@Component({
  selector: 'app-scene-vehicle-types',
  imports: [NarrativeText, TranslateModule, LayerWrapper, StreetComponent],
  templateUrl: './scene-vehicle-types.html',
  styleUrl: './scene-vehicle-types.scss',
})
export class SceneVehicleTypes {
  story = inject(StoryService);
}

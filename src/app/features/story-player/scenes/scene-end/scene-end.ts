import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@shared/ui/backgrounds/sky-grass/sky-grass.component';
import { Clouds } from '@shared/ui/foregrounds/clouds/clouds';

@Component({
  selector: 'app-scene-end',
  imports: [TranslateModule, LayerWrapper, SkyGrassComponent, Clouds],
  templateUrl: './scene-end.html',
  styleUrl: './scene-end.scss',
})
export class SceneEnd {
  story = inject(StoryService);
}

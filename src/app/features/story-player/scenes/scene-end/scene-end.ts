import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@shared/ui/backgrounds/sky-grass/sky-grass.component';
import { Clouds } from '@shared/ui/foregrounds/clouds/clouds';

const sceneName = 'scene-end';
@Component({
  selector: 'app-' + sceneName,
  imports: [TranslateModule, LayerWrapper, SkyGrassComponent, Clouds],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneEnd {
  story = inject(StoryService);
}

import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@features/story-player/backgrounds/sky-grass/sky-grass.component';

@Component({
  selector: 'app-scene-health-impacts',
  imports: [NarrativeText, TranslateModule, LayerWrapper, SkyGrassComponent, CommonModule],
  templateUrl: './scene-health-impacts.html',
  styleUrl: './scene-health-impacts.scss',
})
export class SceneHealthImpacts {
    story = inject(StoryService);

    stage = signal(0);

    advanceTime() {
        if (this.stage() === 0) {
            this.stage.set(1);
        }
    }
}
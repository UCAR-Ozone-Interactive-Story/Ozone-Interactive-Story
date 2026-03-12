import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@features/story-player/backgrounds/sky-grass/sky-grass.component';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
    selector: 'app-scene-health-impacts',
    imports: [NarrativeText, TranslateModule, LayerWrapper, SkyGrassComponent, CommonModule, MatButtonToggleModule],
    templateUrl: './scene-health-impacts.html',
    styleUrl: './scene-health-impacts.scss',
})
export class SceneHealthImpacts {
    story = inject(StoryService);
    stage = signal(0);
    pollutionChoice = "low";

    changeAirPollution(event: Event) {
        const button = event.target as HTMLButtonElement;
        const value = button.value;

        const lowButton = document.getElementById('low-button');
        const highButton = document.getElementById('high-button');

        if (value === 'low') {
            this.stage.set(0);
            lowButton?.classList.add('selected');
            highButton?.classList.remove('selected');
        } else {
            this.stage.set(1);
            highButton?.classList.add('selected');
            lowButton?.classList.remove('selected');
        }

    }
}
import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { StreetComponent } from '@shared/ui/backgrounds/street/street.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { setTabIndexOne } from '@shared/ui/narrative-text/setTabIndexOne';

@Component({
  selector: 'app-scene-health-impacts',
  imports: [
    NarrativeText,
    TranslateModule,
    LayerWrapper,
    StreetComponent,
    CommonModule,
    MatButtonToggleModule,
    setTabIndexOne,
  ],
  templateUrl: './scene-health-impacts.html',
  styleUrl: './scene-health-impacts.scss',
})
export class SceneHealthImpacts {
  story = inject(StoryService);
  stage = signal(0);
  pollutionChoice = 'low';

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

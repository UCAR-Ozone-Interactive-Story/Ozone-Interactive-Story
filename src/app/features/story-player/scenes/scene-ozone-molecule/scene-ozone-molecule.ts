import {
  Component,
  inject,
  signal
} from '@angular/core';

import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

const sceneName = 'scene-ozone-molecule';

@Component({
  selector: 'app-' + sceneName,
  standalone: true,
  imports: [NarrativeText, TranslateModule],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class OzoneMolecule {

  story = inject(StoryService);

  step = signal(0);

  rayActive = signal(false);
  noLeaving = signal(false);
  oxygenReleased = signal(false);
  oxygenMoving = signal(false);
  ozoneFormed = signal(false);
  hideO2 = signal(false);
  hideFreeO = signal(false);

  explanationKey = signal('SCENES.OZONE_MOLECULE.TEXT_1');

  moleculeLabels = {
    NO2: 'SCENES.OZONE_MOLECULE.LABEL_NO2',
    NO: 'SCENES.OZONE_MOLECULE.LABEL_NO',
    O: 'SCENES.OZONE_MOLECULE.LABEL_O',
    O2: 'SCENES.OZONE_MOLECULE.LABEL_O2',
    O3: 'SCENES.OZONE_MOLECULE.LABEL_O3',
  };

  nextStep() {
    const current = this.step();

    if (current === 0) {
      this.rayActive.set(true);
      this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_2');
    }

    else if (current === 1) {
      this.noLeaving.set(true);
      this.oxygenReleased.set(true);
      this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_3');
    }

    else if (current === 2) {
      this.oxygenMoving.set(true);
      this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_4');
    }

    else if (current === 3) {
      this.ozoneFormed.set(true);
      this.hideO2.set(true);
      this.hideFreeO.set(true);
      this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_5');
      this.story.setSceneCompleted(true);
    }

    else if (current === 4) {
      this.reset();
      return;
    }

    this.step.update(v => v + 1);
  }

  reset() {
    this.step.set(0);
    this.rayActive.set(false);
    this.noLeaving.set(false);
    this.oxygenReleased.set(false);
    this.oxygenMoving.set(false);
    this.ozoneFormed.set(false);
    this.hideO2.set(false);
    this.hideFreeO.set(false);
    this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_1');
  }
}
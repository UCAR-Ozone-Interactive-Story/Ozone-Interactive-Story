import { Component, inject, signal } from '@angular/core';
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
  showNO = signal(false);
  oxygenReleased = signal(false);

  oxygenMid = signal(false);
  oxygenEnd = signal(false);

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

  clickSun() {
    if (this.step() !== 0) return;

    this.rayActive.set(true);
    this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_2');
    this.step.set(1);
  }

  clickNO2() {
    if (this.step() !== 1) return;

    this.showNO.set(true);
    this.oxygenReleased.set(true);

    this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_3');
    this.step.set(2);
  }

  clickOxygen() {

    if (this.step() !== 2) return;

    this.oxygenEnd.set(true);

    setTimeout(() => {

      this.ozoneFormed.set(true);
      this.hideO2.set(true);
      this.hideFreeO.set(true);

      this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_4');
      this.story.setSceneCompleted(true);

      this.step.set(3);

    }, 500);
  }

  reset() {

    if (this.step() !== 3) return;

    this.step.set(0);

    this.rayActive.set(false);
    this.showNO.set(false);
    this.oxygenReleased.set(false);

    this.oxygenMid.set(false);
    this.oxygenEnd.set(false);

    this.ozoneFormed.set(false);
    this.hideO2.set(false);
    this.hideFreeO.set(false);

    this.explanationKey.set('SCENES.OZONE_MOLECULE.TEXT_1');
  }

}
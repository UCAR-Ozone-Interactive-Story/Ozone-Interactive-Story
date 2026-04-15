import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
// import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@shared/ui/backgrounds/sky-grass/sky-grass.component';
import { Clouds } from '@shared/ui/foregrounds/clouds/clouds';
import { MultipleChoice, SelectorOption } from '@shared/ui/multiple-choice/multiple-choice';

@Component({
  selector: 'app-scene-air',
  imports: [NarrativeText, LayerWrapper, SkyGrassComponent, Clouds, MultipleChoice],
  templateUrl: './scene-air.html',
  styleUrl: './scene-air.scss',
})
export class SceneAir {
  story = inject(StoryService);
  showSecondText = false;

  // keep track of which molecules have been selected
  selectedMolecules = signal<Set<string>>(new Set());

  onOptionSelected(option: SelectorOption) {
    console.log('Option selected:', option);

    if (option.isCorrect) {
      // if the user selects the correct molecule, add it to selectedMolecules
      this.selectedMolecules.update(molecules => new Set([...molecules, option.id]));
    }

    // Check if all correct molecules are selected
    const correctIds = ['n2', 'o2', 'other'];
    const allSelected = correctIds.every(id => this.selectedMolecules().has(id));
    if (allSelected) {
      this.showSecondText = true;
      this.story.setSceneCompleted(true);
    }
  }

  isMoleculeVisible(moleculeId: string): boolean {
    return this.selectedMolecules().has(moleculeId);
  }
}
import { Component, inject, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CdkDrag, CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { SunlessCity } from '@shared/ui/backgrounds/sunless-city/sunless-city.component';

@Component({
  selector: 'app-scene-gather-ingredients',
  imports: [NarrativeText, CdkDrag, SunlessCity, LayerWrapper],
  templateUrl: './scene-gather-ingredients.html',
  styleUrl: './scene-gather-ingredients.scss',
})
export class SceneGatherIngredients {
  story = inject(StoryService);
  moleculesGathered = signal(false);
  sunClicked = false;

  molecules = [
    {
      alt: 'V O C Molecule',
      src: 'images/molecules/VOC.png',
      label: 'VOC',
      id: 0,
      location: 'paint',
      top: '8%',
      left: '8%',
    },
    {
      alt: 'V O C Molecule',
      src: 'images/molecules/VOC.png',
      label: 'VOC',
      id: 1,
      location: 'paint',
      top: '45%',
      left: '55%',
    },
    {
      alt: 'V O C Molecule',
      src: 'images/molecules/VOC.png',
      label: 'VOC',
      id: 2,
      location: 'paint',
      top: '20%',
      left: '65%',
    },
    {
      alt: 'V O C Molecule',
      src: 'images/molecules/VOC.png',
      label: 'VOC',
      id: 3,
      location: 'car',
      top: '10%',
      left: '10%',
    },
    {
      alt: 'N O 2 Molecule',
      src: 'images/molecules/NO2drop.png',
      label: 'NO₂',
      id: 4,
      location: 'car',
      top: '42%',
      left: '52%',
    },
    {
      alt: 'N O 2 Molecule',
      src: 'images/molecules/NO2drop.png',
      label: 'NO₂',
      id: 5,
      location: 'factory',
      top: '12%',
      left: '15%',
    },
    {
      alt: 'N O 2 Molecule',
      src: 'images/molecules/NO2drop.png',
      label: 'NO₂',
      id: 6,
      location: 'factory',
      top: '48%',
      left: '55%',
    },
  ];

  // if moved by mouse it is more of a freeform drag and drop
  // with the drop location contstrained to the ozone cloud
  ozoneMoleculesMovedByKeyboard = [];

  explanation1Read() {
    return false;
    return document.getElementById('explanation1') != undefined;
  }
  explanation2Read() {
    return false;
    return document.getElementById('explanation2') != undefined;
  }
  onSunClicked() {
    if (!this.moleculesGathered()) return;
    this.sunClicked = true;
    setTimeout(() => {
      this.story.setSceneCompleted(true);
    }, 600);
  }

  assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (val === undefined || val === null) {
      throw new Error(`Expected value to be defined, but received ${val}`);
    }
  }
  ozoneCloudHas(moleculeToFind: string) {
    for (let molecule of this.molecules) {
      if (molecule.label === moleculeToFind && molecule.location === 'ozoneCloud') {
        return true;
      }
    }
    return false;
  }
  getElementUnder(element: HTMLElement, point_in_elm: Point) {
    // hide element so we can see what is under it
    element.style.visibility = 'hidden';
    const elementUnderItem = document.elementFromPoint(point_in_elm.x, point_in_elm.y);
    element.style.visibility = '';
    return elementUnderItem;
  }
  getMoleculeId(element: HTMLElement) {
    const idString = element.getAttribute('id');
    this.assertIsDefined(idString);
    return parseInt(idString.substring(8));
  }
  getMoleculeData(element: HTMLElement) {
    return this.molecules[this.getMoleculeId(element)];
  }
  handleKeyPressedToMoveMolecule(event: Event) {
    event.preventDefault();
    const molecule = event.target as HTMLElement;
    molecule.setAttribute('inOzoneCloud', 'true');
    const id = this.getMoleculeId(molecule);
    this.molecules[id].location = 'ozoneCloud';
    this.checkIfMoleculesAreGathered();
  }
  checkIfMoleculesAreGathered() {
    if (this.ozoneCloudHas('VOC') && this.ozoneCloudHas('NO₂')) {
      console.log('ozone cloud has ingredients');
      this.moleculesGathered.set(true);
    }
  }
  handleMoleculeClick(event: Event) {
    let molecule = event.currentTarget as HTMLElement;
    if (!molecule.classList.contains('molecule-circle') && molecule.parentElement) {
      molecule = molecule.parentElement;
    }
    molecule.focus();
  }

  handleDragEnd(event: CdkDragEnd) {
    const position = event.dropPoint;
    const ozoneCloud = document.getElementById('ozone-cloud');
    const moleculeElm = event.source.getRootElement();
    const elementUnderItem = this.getElementUnder(moleculeElm, position);

    if (elementUnderItem === ozoneCloud || ozoneCloud?.contains(elementUnderItem)) {
      this.getMoleculeData(moleculeElm).location = 'ozoneCloud';
      this.checkIfMoleculesAreGathered();
      event.source.reset(); // reset transform so flexbox takes over layout
    } else {
      event.source.reset();
    }
  }
}

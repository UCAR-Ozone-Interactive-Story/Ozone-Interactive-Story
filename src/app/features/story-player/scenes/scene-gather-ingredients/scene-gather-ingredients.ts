import { Component, inject, Renderer2 } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CdkDrag, CdkDragEnd, Point, transferArrayItem } from '@angular/cdk/drag-drop';
const sceneName = 'scene-gather-ingredients';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText, TranslateModule, CdkDrag],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneGatherIngredients {
  story = inject(StoryService);
  constructor(private renderer: Renderer2) {}

  molecules = [
    { label: 'VOC', id: 0, location: 'paint' },
    { label: 'VOC', id: 1, location: 'paint' },
    { label: 'VOC', id: 2, location: 'paint' },
    { label: 'VOC', id: 3, location: 'car' },
    { label: 'NO₂', id: 4, location: 'car' },
    { label: 'NO₂', id: 5, location: 'factory' },
    { label: 'NO₂', id: 6, location: 'factory' },
  ];
  // if moved by mouse it is more of a freeform drag and drop
  // with the drop location contstrained to the ozone cloud
  ozoneMoleculesMovedByKeyboard = [];

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
    this.checkIfSceneComplete();
  }
  checkIfSceneComplete() {
    if (this.ozoneCloudHas('VOC') && this.ozoneCloudHas('NO₂')) {
      console.log('ozone cloud has ingredients');
      this.story.setSceneCompleted(true);
    }
  }
  handleDragEnd(event: CdkDragEnd) {
    const position = event.dropPoint;
    const ozoneCloud = document.getElementById('ozone-cloud');
    const moleculeElm = event.source.getRootElement();
    const elementUnderItem = this.getElementUnder(moleculeElm, position);

    if (elementUnderItem === ozoneCloud) {
      this.getMoleculeData(moleculeElm).location = 'ozoneCloud';
      this.checkIfSceneComplete();
    } else {
      // move back to previous drop container
      event.source.reset();
    }
  }
}

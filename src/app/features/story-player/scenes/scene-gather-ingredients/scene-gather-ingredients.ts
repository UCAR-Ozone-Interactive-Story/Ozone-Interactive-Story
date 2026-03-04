import { Component, inject, output, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CdkDrag, CdkDragEnd, Point } from '@angular/cdk/drag-drop';
// const sceneName = 'scene-gather-ingredients';
@Component({
  selector: 'app-scene-gather-ingredients',
  imports: [NarrativeText, CdkDrag],
  templateUrl: './scene-gather-ingredients.html',
  styleUrl: './scene-gather-ingredients.scss',
})
export class SceneGatherIngredients {
  story = inject(StoryService);

  paintCanContents = ['VOC', 'VOC', 'VOC'];
  carContents = ['VOC', 'NO₂'];
  factoryContents = ['NO₂', 'NO₂'];

  ozoneCloudHas(moleculeToFind: string) {
    const molecules = document.getElementsByClassName('molecule-circle');
    for (let i = 0; i < molecules.length; i++) {
      const moleculeLabel = molecules[i].childNodes[0] as Element;
      if (
        moleculeLabel.innerHTML === moleculeToFind &&
        molecules[i].getAttribute('inOzoneCloud') === 'true'
      ) {
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
  handleDragEnd(event: CdkDragEnd) {
    const position = event.dropPoint;
    const ozoneCloud = document.getElementById('ozone-cloud');
    const elementUnderItem = this.getElementUnder(event.source.getRootElement(), position);

    if (elementUnderItem === ozoneCloud) {
      event.source.getRootElement().setAttribute('inOzoneCloud', 'true');
      if (this.ozoneCloudHas('VOC') && this.ozoneCloudHas('NO₂')) {
        console.log('ozone cloud has ingredients');
        this.story.setSceneCompleted(true);
      }
    } else {
      event.source.getRootElement().setAttribute('inOzoneCloud', 'false');
      // move back to previous drop container
      event.source.reset();
    }
  }
}

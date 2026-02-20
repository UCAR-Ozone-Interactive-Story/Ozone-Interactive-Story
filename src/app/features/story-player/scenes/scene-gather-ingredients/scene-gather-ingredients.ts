import { Component, inject, output, signal } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CdkDrag, CdkDragDrop, transferArrayItem, CdkDragEnd, Point } from '@angular/cdk/drag-drop';
const sceneName = 'scene-gather-ingredients';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText, TranslateModule, CdkDrag],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneGatherIngredients {
  story = inject(StoryService);

  paintCanContents = ['VOC', 'VOC', 'VOC'];
  carContents = ['VOC', 'NO₂'];
  factoryContents = ['NO₂', 'NO₂'];
  isComplete = signal(false);

  completed = output<void>();

  ozoneCloudHas(moleculeToFind: string) {
    const molecules = document.getElementsByClassName('molecule-label');
    for (let i = 0; i < molecules.length; i++) {
      if (molecules[i].innerHTML == moleculeToFind) {
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
      event.source.data = 'inOzoneCloud';
      if (this.ozoneCloudHas('VOC') && this.ozoneCloudHas('NO₂')) {
        if (!this.isComplete()) {
          this.isComplete.set(true);
          this.completed.emit();
        }
      }
    } else {
      event.source.data = 'notInOzoneCloud';
      // move back to previous drop container
      event.source.reset();
    }
  }
}

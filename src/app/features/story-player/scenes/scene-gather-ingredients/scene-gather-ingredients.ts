import { Component, inject } from '@angular/core';
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

  molecules1 = ['1', '2', '3', '4', '5'];
  paintCanContents = ['VOC', 'VOC', 'VOC'];
  carContents = ['VOC', 'NO₂'];
  factoryContents = ['NO₂', 'NO₂'];
  ozoneCloudContents = [];
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
    if (elementUnderItem !== ozoneCloud) {
      // move back to previous drop container
      event.source.reset();
    }
  }
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

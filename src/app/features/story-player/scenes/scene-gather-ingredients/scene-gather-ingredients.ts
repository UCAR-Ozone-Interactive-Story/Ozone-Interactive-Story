import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CdkDrag, CdkDragDrop, transferArrayItem, CdkDragEnd } from '@angular/cdk/drag-drop';
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
  ozoneCloudContents = [];
  handleDragEnd(event: CdkDragEnd) {
    const position = event.dropPoint;
    const ozoneCloud = document.getElementById('ozone-cloud');
    event.source.getRootElement().style.visibility = 'hidden';
    const elementUnderItem = document.elementFromPoint(position.x, position.y);
    event.source.getRootElement().style.visibility = '';
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

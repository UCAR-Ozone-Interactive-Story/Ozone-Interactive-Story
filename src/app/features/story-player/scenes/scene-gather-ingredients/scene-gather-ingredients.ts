import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';
import { CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
const sceneName = 'scene-gather-ingredients';
@Component({
  selector: 'app-' + sceneName,
  imports: [NarrativeText, TranslateModule, CdkDrag, CdkDropList],
  templateUrl: './' + sceneName + '.html',
  styleUrl: './' + sceneName + '.scss',
})
export class SceneGatherIngredients {
  story = inject(StoryService);

  molecules1 = ['1', '2', '3', '4'];
  smogParticals = ['5'];
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

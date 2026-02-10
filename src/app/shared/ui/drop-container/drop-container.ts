import { Component } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-container',
  standalone: true,
  templateUrl: './drop-container.html',
  imports: [CdkDropList],
})
export class dropContainer {
  alwaysTruePredicate() {
    return true;
  }
}

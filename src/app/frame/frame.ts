import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectedFrame, frameUnlocked, unlockFrame } from './frame.state';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frame.html',
  styleUrls: ['./frame.scss'],
})
export class Frame {

  readonly selectedFrame = selectedFrame;
  readonly frameUnlocked = frameUnlocked;

  // change selection only if unlocked
  select(n: number) {
    if (this.frameUnlocked()[n]) {
      selectedFrame.set(n);
    } else {
      console.warn("Frame " + n + " is locked.");
    }
  }

  // START button action
  startStory() {
    unlockFrame(2);       // unlock frame 2
    selectedFrame.set(2); // navigate to frame 2
  }
}


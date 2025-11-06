import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectedFrame } from './frame.state';

@Component({
  selector: 'app-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frame.html',
  styleUrls: ['./frame.scss'],
})
export class Frame {
  // expose the signal so template can read current selection
  readonly selectedFrame = selectedFrame;

  // convenience method to change selection from within the frame
  select(n: number) {
    selectedFrame.set(n);
  }
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectedFrame, frameUnlocked } from '../frame/frame.state';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { frameUnlocked } from '../frame/frame.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers: [TranslateService],
})
export class Navbar {
  readonly selectedFrame = selectedFrame;
  open = false;

  toggle() {
    this.open = !this.open;
  }

  buttonVisible(n: number) {
    return frameUnlocked()[n];
  }
  // for back button
  goBack() {
    selectedFrame.update(n => Math.max(n - 1, 1));
    this.open = false;
  }

  //for forward button
  goForward() {
    // must check that next slide is unlocked
    const current = selectedFrame();
    const next = current + 1;
    const unlocked = frameUnlocked();
    // check if next frame is unlocked before advancing
    if (!unlocked[next]) return;
    selectedFrame.update(n => n + 1);
    this.open = false;
  }

  go(n: number) {
    selectedFrame.set(n);
    this.open = false;
  }
}


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectedFrame } from '../frame/frame.state';
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

  go(n: number) {
    selectedFrame.set(n);
    this.open = false;
  }
}

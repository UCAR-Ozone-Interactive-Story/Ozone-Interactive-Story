
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectedFrame } from '../frame/frame.state';
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers: [TranslateService]
})
export class Navbar {
  readonly selectedFrame = selectedFrame;
  open = false;

  toggle() {
    this.open = !this.open;
  }

  goBack() {
    selectedFrame.update(n => Math.max(n - 1, 1));
    this.open = false;
  }

  goForward() {
    selectedFrame.update(n => n + 1);
    this.open = false;
  }

  go(n: number) {
    selectedFrame.set(n);
    this.open = false;
  }
}

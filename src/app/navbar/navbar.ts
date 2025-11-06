
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectedFrame } from '../frame/frame.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  readonly selectedFrame = selectedFrame;
  open = false;

  toggle() {
    this.open = !this.open;
  }

  go(n: number) {
    selectedFrame.set(n);
    this.open = false;
  }
}

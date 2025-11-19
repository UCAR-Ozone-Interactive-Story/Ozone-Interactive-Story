import { Component, input, Input, output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SlideData } from '../slides';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers: [TranslateService],
})
export class Navbar {
  slides = input.required<SlideData[]>();
  currentSlide = input.required<SlideData>();
  go = output<SlideData>();

  open = false;

  toggle() {
    this.open = !this.open;
  }

  try_navigate(slide: SlideData) {
    if (!slide.visited) return;
    this.open = false;
    this.go.emit(slide);
  }
}

import { Component, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { ALL_SLIDES, SlideData } from '../slides';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play-page',
  imports: [CommonModule, Navbar],
  templateUrl: './play-page.html',
  styleUrl: './play-page.scss',
})
export class PlayPage {
  ALL_SLIDES = ALL_SLIDES;
  readonly currentSlide = signal(ALL_SLIDES[0]);

  go(slide: SlideData) {
    this.currentSlide.set(slide);
  }
}

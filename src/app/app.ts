import { Component, signal, HostListener, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [TranslateService],
})
export class App {
  protected readonly title = signal('Ozone Interactive Story');
  private translate = inject(TranslateService);

  // orientation + device signals
  isPortrait = signal(false);
  isMobile = false;

  // apply class to <app-root> when mobile landscape
  @HostBinding('class.mobile-landscape')
  get mobileLandscape() {
    return this.isMobile && !this.isPortrait();
  }

  constructor() {
    // language setup
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setFallbackLang('en');
    this.translate.use(savedLang);

    // mobile detection + orientation
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.checkOrientation();

    // iOS sometimes reports incorrect dimensions initially
    setTimeout(() => this.checkOrientation(), 150);
  }

  // watch rotation + resize
  @HostListener('window:resize')
  @HostListener('window:orientationchange')
  checkOrientation() {
    if (!this.isMobile) {
      this.isPortrait.set(false);
      return;
    }

    const portrait = window.innerHeight > window.innerWidth;
    this.isPortrait.set(portrait);
  }
}

import { Component, signal, Inject, PLATFORM_ID, HostListener, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StoryService } from '@core/story.service';
import { NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [TranslateService],
})
export class App {
  protected readonly title = signal('Ozone Interactive Story');

  // orientation + device signals
  isPortrait = signal(false);
  isMobile = false;

  // apply class to <app-root> when mobile landscape
  @HostBinding('class.mobile-landscape')
  get mobileLandscape() {
    return this.isMobile && !this.isPortrait();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private story: StoryService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // language setup
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translate.setFallbackLang('en');
      this.translate.use(savedLang);

      // restore story progress
      this.initStoryProgress();

      // mobile detection + orientation
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      this.checkOrientation();

      // iOS sometimes reports incorrect dimensions initially
      setTimeout(() => this.checkOrientation(), 150);
    }
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

  private initStoryProgress() {
    const savedIndex = localStorage.getItem('story.currentIndex');
    const savedUnlocked = localStorage.getItem('story.unlockedScenes');

    // restore unlocked scenes FIRST
    if (savedUnlocked) {
      try {
        const parsed = JSON.parse(savedUnlocked) as string[];
        parsed.forEach(id => this.story.unlockScene(id));
        console.log('[App] Restored unlockedScenes ->', parsed);
      } catch (err) {
        console.warn('[App] Failed to parse unlockedScenes', err);
      }
    }

    // restore current scene
    if (savedIndex !== null) {
      const index = Number(savedIndex);

      if (!Number.isNaN(index)) {
        const scene = StoryService['SCENE_DEFINITIONS']?.[index];

        if (scene) {
          console.log('[App] Restoring current scene ->', scene.id);
          this.story.jumpTo(scene.id, false);
        }
      }
    }
  }
}
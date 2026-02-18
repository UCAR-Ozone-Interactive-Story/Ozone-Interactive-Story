import { Component, signal, HostListener, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StoryService } from '@core/story.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [TranslateService],
})
export class App {
  protected readonly title = signal('Ozone Interactive Story');
  private translate = inject(TranslateService);
  private story = inject(StoryService);

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

    // restore story progress
    this.initStoryProgress();

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

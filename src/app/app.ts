import { Component, signal } from '@angular/core';
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

  constructor(
    private translate: TranslateService,
    private story: StoryService,
  ) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setFallbackLang('en'); // default fallback
    this.translate.use(savedLang); // use persisted or default

    this.initStoryProgress();
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

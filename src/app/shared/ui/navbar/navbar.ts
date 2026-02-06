import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { StoryService } from '@core/story.service';
import { Scene } from '@core/scene';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers: [TranslateService],
})
export class Navbar {
  story = inject(StoryService);

  open = false;

  toggle() {
    this.open = !this.open;
  }

  navigate(scene: Scene) {
    this.story.jumpTo(scene.id);
  }

  reset() {
    console.log('[Navbar] Reset button clicked');
    this.story.resetProgress();
    location.reload();
  }
}

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown';
import { StoryService } from '@core/story.service';

@Component({
  selector: 'app-home',
  imports: [LanguageDropdownComponent, TranslateModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private router = inject(Router);
  private story = inject(StoryService);

  play() {
    this.story.jumpTo('morning'); // todo change this to find the first scene
    this.router.navigate(['play']);
  }
}

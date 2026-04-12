import { Component, inject } from '@angular/core';
import { StoryService } from '@core/story.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown';
import { LayerWrapper } from '@features/story-player/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@features/story-player/backgrounds/sky-grass/sky-grass.component';
import { Clouds } from '@features/story-player/foregrounds/clouds/clouds';

const sceneName = 'scene-end';
@Component({
  selector: 'app-home',
  imports: [LanguageDropdownComponent, TranslateModule, RouterModule, LayerWrapper, SkyGrassComponent, Clouds],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
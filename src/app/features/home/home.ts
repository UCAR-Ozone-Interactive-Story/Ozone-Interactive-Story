import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown';
import { LayerWrapper } from '@shared/ui/layer-wrapper/layer-wrapper.component';
import { SkyGrassComponent } from '@shared/ui/backgrounds/sky-grass/sky-grass.component';
import { Clouds } from '@shared/ui/foregrounds/clouds/clouds';

@Component({
  selector: 'app-home',
  imports: [LanguageDropdownComponent, TranslateModule, RouterModule, LayerWrapper, SkyGrassComponent, Clouds],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

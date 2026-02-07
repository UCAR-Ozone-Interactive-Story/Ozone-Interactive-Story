import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown';

@Component({
  selector: 'app-home',
  imports: [LanguageDropdownComponent, TranslateModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

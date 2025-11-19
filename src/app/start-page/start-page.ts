import { Component } from '@angular/core';
import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start-page',
  imports: [LanguageDropdownComponent, TranslateModule, RouterModule],
  templateUrl: './start-page.html',
  styleUrl: './start-page.scss',
})
export class StartPage {}

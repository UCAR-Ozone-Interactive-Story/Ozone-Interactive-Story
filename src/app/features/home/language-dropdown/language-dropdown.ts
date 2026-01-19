import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule
  ],
  providers: [TranslateService],
  templateUrl: './language-dropdown.html'
})
export class LanguageDropdownComponent implements OnInit {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  selectedLang = 'en'; // default

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const storedLang = localStorage.getItem('lang');
      this.selectedLang = storedLang || this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en';
      this.translate.use(this.selectedLang);
    } else {
      // SSR fallback
      this.selectedLang = this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en';
    }
  }

  changeLanguage(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }
}

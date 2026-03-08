import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
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
  private translate = inject(TranslateService);
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  selectedLang = 'en'; // default

  ngOnInit() {
    const storedLang = localStorage.getItem('lang');
    this.selectedLang = storedLang || this.translate.getCurrentLang() || this.translate.getFallbackLang() || 'en';
    this.translate.use(this.selectedLang);
  }

  changeLanguage(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);

    localStorage.setItem('lang', lang);
  }
}

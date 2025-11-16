// import { Component, signal, inject } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Navbar } from './navbar/navbar';
// import { Frame } from './frame/frame';
// import { TranslateService, TranslatePipe, TranslateDirective } from "@ngx-translate/core";

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, Navbar, Frame],
//   templateUrl: './app.html',
//   styleUrls: ['./app.scss']
// })
// export class App {
//   protected readonly title = signal('Ozone Interactive Story');
//   constructor(private translate: TranslateService) {
//     // Load saved language from localStorage
//     const savedLang = localStorage.getItem('lang') || 'en';
//     translate.setDefaultLang('en');   // default fallback
//     translate.use(savedLang);         // use persisted or default
//   }
// }

import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Frame } from './frame/frame';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService, TranslatePipe, TranslateDirective } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Frame],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [TranslateService]
})
export class App {
  protected readonly title = signal('Ozone Interactive Story');
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private translate: TranslateService) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'en';
      translate.setDefaultLang('en');   // default fallback
      translate.use(savedLang);         // use persisted or default
    }
  }
}

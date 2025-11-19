// todo refactor to play-page folder

import { Type } from '@angular/core';
import { PlayPage } from './play-page/play-page';
import { SlideExample } from './slides/slide-example';
import { SlideExample2 } from './slides/slide-example2';

export interface SlideData {
  readonly id: string;
  readonly i18n_key: string;
  readonly component: Type<any>;
  visited: boolean;
}

export const ALL_SLIDES: SlideData[] = [
  {
    id: 'EXAMPLE_SLIDE',
    i18n_key: 'SLIDES.EXAMPLE',
    component: SlideExample,
    visited: true,
  },
  {
    id: 'EXAMPLE_SLIDE_2',
    i18n_key: 'SLIDES.EXAMPLE_2',
    component: SlideExample2,
    visited: true,
  },
];

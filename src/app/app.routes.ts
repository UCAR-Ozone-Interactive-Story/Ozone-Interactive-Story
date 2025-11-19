import { Routes } from '@angular/router';
import { StartPage } from './start-page/start-page';
import { PlayPage } from './play-page/play-page';

export const routes: Routes = [
  {
    path: '',
    component: StartPage,
  },
  {
    path: 'play',
    component: PlayPage,
  },
];

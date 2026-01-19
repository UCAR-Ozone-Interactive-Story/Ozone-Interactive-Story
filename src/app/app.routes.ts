import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { StoryPlayer } from './features/story-player/story-player';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'play',
    component: StoryPlayer
  }
];

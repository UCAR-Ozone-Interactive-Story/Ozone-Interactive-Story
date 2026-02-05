import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { StoryPlayer } from './features/story-player/story-player';
import { ResumeRedirectGuard } from './core/resume-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [ResumeRedirectGuard],
    component: Home,
  },
  {
    path: 'play',
    component: StoryPlayer
  }
];

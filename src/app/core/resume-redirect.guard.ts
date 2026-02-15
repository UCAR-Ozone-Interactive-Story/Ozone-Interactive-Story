import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ResumeRedirectGuard implements CanActivate {
  private hasCheckedOnce = false;

  constructor(
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.hasCheckedOnce) {
      return true;
    }

    this.hasCheckedOnce = true;

    const currentIndex = localStorage.getItem('story.currentIndex');

    if (currentIndex !== null) {
      this.router.navigateByUrl('/play');
      return false;
    }

    console.log('[ResumeRedirectGuard] No progress -> show Home');
    return true;
  }
}

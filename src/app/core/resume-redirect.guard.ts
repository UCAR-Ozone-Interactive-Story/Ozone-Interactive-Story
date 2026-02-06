import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ResumeRedirectGuard implements CanActivate {
  private hasCheckedOnce = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    if (this.hasCheckedOnce) {
      return true;
    }

    this.hasCheckedOnce = true;

    const currentIndex = localStorage.getItem('story.currentIndex');

    if (currentIndex !== null) {
      console.log('[ResumeRedirectGuard] Redirecting to /play');
      this.router.navigateByUrl('/play');
      return false;
    }

    console.log('[ResumeRedirectGuard] No progress -> show Home');
    return true;
  }
}

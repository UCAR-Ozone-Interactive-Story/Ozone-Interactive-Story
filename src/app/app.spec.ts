import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { App } from './app';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation() { return of({}); }
}

describe('App', () => {
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader }
        }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component['title']()).toBe('Ozone Interactive Story');
  });

  it('should use saved language from localStorage', () => {
    localStorage.setItem('lang', 'es');
    const fixture = TestBed.createComponent(App);
    const instance = fixture.componentInstance;
    expect(instance['translate'].currentLang).toBe('es');
    localStorage.removeItem('lang');
  });

  it('should fall back to english if no language in localStorage', () => {
    localStorage.removeItem('lang');
    const fixture = TestBed.createComponent(App);
    const instance = fixture.componentInstance;
    expect(instance['translate'].currentLang).toBe('en');
  });

  describe('mobileLandscape getter', () => {
    it('should return false when not mobile', () => {
      component.isMobile = false;
      component.isPortrait.set(false);
      expect(component.mobileLandscape).toBeFalse();
    });

    it('should return false when mobile and portrait', () => {
      component.isMobile = true;
      component.isPortrait.set(true);
      expect(component.mobileLandscape).toBeFalse();
    });

    it('should return true when mobile and landscape', () => {
      component.isMobile = true;
      component.isPortrait.set(false);
      expect(component.mobileLandscape).toBeTrue();
    });
  });

  describe('checkOrientation', () => {
    it('should set isPortrait to false when not mobile', () => {
      component.isMobile = false;
      component.isPortrait.set(true);
      component.checkOrientation();
      expect(component.isPortrait()).toBeFalse();
    });

    it('should set isPortrait to true when mobile and height > width', () => {
      component.isMobile = true;
      spyOnProperty(window, 'innerHeight').and.returnValue(800);
      spyOnProperty(window, 'innerWidth').and.returnValue(400);
      component.checkOrientation();
      expect(component.isPortrait()).toBeTrue();
    });

    it('should set isPortrait to false when mobile and width > height', () => {
      component.isMobile = true;
      spyOnProperty(window, 'innerHeight').and.returnValue(400);
      spyOnProperty(window, 'innerWidth').and.returnValue(800);
      component.checkOrientation();
      expect(component.isPortrait()).toBeFalse();
    });
  });

  describe('orientation change', () => {
    it('should call checkOrientation on window resize', () => {
      spyOn(component, 'checkOrientation');
      window.dispatchEvent(new Event('resize'));
      expect(component.checkOrientation).toHaveBeenCalled();
    });

    it('should call checkOrientation on orientationchange', () => {
      spyOn(component, 'checkOrientation');
      window.dispatchEvent(new Event('orientationchange'));
      expect(component.checkOrientation).toHaveBeenCalled();
    });
  });

  describe('isPortrait', () => {
    it('should show rotate warning when portrait', () => {
      const fixture = TestBed.createComponent(App);
      const instance = fixture.componentInstance;
      instance.isMobile = true;
      instance.isPortrait.set(true);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.rotate-warning')).toBeTruthy();
    });

    it('should show router outlet when not portrait', () => {
      const fixture = TestBed.createComponent(App);
      const instance = fixture.componentInstance;
      instance.isPortrait.set(false);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('router-outlet')).toBeTruthy();
    });
  });
});
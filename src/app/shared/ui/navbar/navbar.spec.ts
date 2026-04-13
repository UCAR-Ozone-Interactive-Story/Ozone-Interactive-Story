import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Navbar } from './navbar';
import { StoryService } from '@core/story.service';
import { Scene } from '@core/scene';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation() { return of({}); }
}

const mockScene: Scene = { id: 'morning', i18n_title: 'SCENES.MORNING.TITLE', component: null as any };

const mockStoryService = {
  scenes: () => [mockScene],
  jumpTo: jasmine.createSpy('jumpTo'),
  resetProgress: jasmine.createSpy('resetProgress'),
  currentScene: () => mockScene,
  transition: () => ({ animationType: 'fade', textDelay: 1200 }),
  isSceneCompleted: () => false,
  setSceneCompleted: jasmine.createSpy('setSceneCompleted'),
};

describe('Navbar', () => {
  let component: Navbar;

  beforeEach(async () => {
    mockStoryService.jumpTo = jasmine.createSpy('jumpTo');
    mockStoryService.resetProgress = jasmine.createSpy('resetProgress');

    await TestBed.configureTestingModule({
      imports: [
        Navbar,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader }
        }),
      ],
      providers: [
        { provide: StoryService, useValue: mockStoryService }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle', () => {
    it('should set open to true when initially false', () => {
      expect(component.open).toBeFalse();
      component.toggle();
      expect(component.open).toBeTrue();
    });

    it('should set open to false when already true', () => {
      component.open = true;
      component.toggle();
      expect(component.open).toBeFalse();
    });
  });

  describe('navigate', () => {
    it('should call story.jumpTo with scene id', () => {
      component.navigate(mockScene);
      expect(mockStoryService.jumpTo).toHaveBeenCalledWith('morning');
    });
  });

  describe('reset', () => {
    it('should call story.resetProgress', () => {
      spyOn(console, 'log');
      component.reset();
      expect(mockStoryService.resetProgress).toHaveBeenCalled();
    });

    it('should log reset message', () => {
      spyOn(console, 'log');
      component.reset();
      expect(console.log).toHaveBeenCalledWith('[Navbar] Reset button clicked');
    });
  });

  describe('template', () => {
    it('should not show menu panel when closed', () => {
      const fixture = TestBed.createComponent(Navbar);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.menu-panel')).toBeNull();
    });

    it('should show menu panel when open', () => {
      const fixture = TestBed.createComponent(Navbar);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.menu-panel')).toBeTruthy();
    });

    it('should render a button for each scene when open', () => {
      const fixture = TestBed.createComponent(Navbar);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      const items = el.querySelectorAll('.item');
      expect(items.length).toBe(mockStoryService.scenes().length);
    });

    it('should call navigate when scene button is clicked', () => {
      const fixture = TestBed.createComponent(Navbar);
      fixture.componentInstance.open = true;
      fixture.detectChanges();
      spyOn(fixture.componentInstance, 'navigate');
      const el = fixture.nativeElement as HTMLElement;
      const firstItem = el.querySelector('.item') as HTMLButtonElement;
      firstItem.click();
      expect(fixture.componentInstance.navigate).toHaveBeenCalledWith(mockScene);
    });
  });
});
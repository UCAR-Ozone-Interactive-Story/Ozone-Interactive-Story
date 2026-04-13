import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StoryPlayer } from './story-player';
import { StoryService, TransitionConfig } from '@core/story.service';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation() { return of({}); }
}

@Component({ selector: 'app-stub-scene', template: '', standalone: true })
class StubSceneComponent {}

function makeTransition(animationType: TransitionConfig['animationType'], textDelay = 0): TransitionConfig {
  return { animationType, textDelay };
}

const mockStoryService = {
  currentScene: () => ({ id: 'morning', component: StubSceneComponent, i18n_title: 'SCENES.MORNING.TITLE' }),
  transition: () => makeTransition('fade', 1200),
  nextScene: jasmine.createSpy('nextScene'),
  prevScene: jasmine.createSpy('prevScene'),
  isSceneCompleted: () => false,
  setSceneCompleted: jasmine.createSpy('setSceneCompleted'),
  scenes: () => [],
  currentIndexValue: () => 0,
  totalScenes: 14,
  jumpTo: jasmine.createSpy('jumpTo'),
  resetProgress: jasmine.createSpy('resetProgress'),
};

describe('StoryPlayer', () => {
  let component: StoryPlayer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  imports: [
      StoryPlayer,
      RouterTestingModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: FakeTranslateLoader }
      }),
    ],
    providers: [
      { provide: StoryService, useValue: mockStoryService }
    ]
  }).compileComponents();

    const fixture = TestBed.createComponent(StoryPlayer);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('enterAnimation', () => {
    it('should return fade-in for fade transition', () => {
      mockStoryService.transition = () => makeTransition('fade');
      expect(component.enterAnimation).toBe('fade-in');
    });

    it('should return slide-in-left for slide-left transition', () => {
      mockStoryService.transition = () => makeTransition('slide-left');
      expect(component.enterAnimation).toBe('slide-in-left');
    });

    it('should return slide-in-down for slide-down transition', () => {
      mockStoryService.transition = () => makeTransition('slide-down');
      expect(component.enterAnimation).toBe('slide-in-down');
    });

    it('should return fade-in as default for unknown animation type', () => {
      mockStoryService.transition = () => ({ animationType: 'unknown' as any, textDelay: 0 });
      expect(component.enterAnimation).toBe('fade-in');
    });
  });

  describe('leaveAnimation', () => {
    it('should return fade-out for fade transition', () => {
      mockStoryService.transition = () => makeTransition('fade');
      expect(component.leaveAnimation).toBe('fade-out');
    });

    it('should return slide-out-left for slide-left transition', () => {
      mockStoryService.transition = () => makeTransition('slide-left');
      expect(component.leaveAnimation).toBe('slide-out-left');
    });

    it('should return slide-out-down for slide-down transition', () => {
      mockStoryService.transition = () => makeTransition('slide-down');
      expect(component.leaveAnimation).toBe('slide-out-down');
    });

    it('should return fade-out as default for unknown animation type', () => {
      mockStoryService.transition = () => ({ animationType: 'unknown' as any, textDelay: 0 });
      expect(component.leaveAnimation).toBe('fade-out');
    });
  });

  describe('ngOnInit', () => {
    it('should log current scene id', () => {
      spyOn(console, 'log');
      component.ngOnInit();
      expect(console.log).toHaveBeenCalledWith(
        '[StoryPlayer] Loaded. Current scene ->',
        'morning'
      );
    });
  });
});
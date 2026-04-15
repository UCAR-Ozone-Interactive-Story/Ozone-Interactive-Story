import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneSunnyDay } from './scene-sunny-day';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneSunnyDay', () => {
  let component: SceneSunnyDay;
  let fixture: ComponentFixture<SceneSunnyDay>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneSunnyDay);
    fixture = TestBed.createComponent(SceneSunnyDay);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sun image and background components', () => {
    const sunImg = fixture.debugElement.query(By.css('.sun'));
    const cityBg = fixture.debugElement.query(By.css('app-sunless-city'));
    const clouds = fixture.debugElement.query(By.css('app-clouds'));

    expect(sunImg).toBeTruthy();
    expect(sunImg.nativeElement.src).toContain('space-sun.png');
    expect(cityBg).toBeTruthy();
    expect(clouds).toBeTruthy();
  });

  it('should pass correct translation key and transition delay to narrative text', () => {
    const narrativeEl = fixture.debugElement.query(By.directive(NarrativeText));
    const narrativeInstance = narrativeEl.componentInstance as NarrativeText;

    expect(narrativeInstance.textKey()).toBe('SCENES.SUNNY_DAY.TEXT_1');
    expect(narrativeInstance.startDelay()).toBe(storyServiceMock.transition().textDelay);
  });

  it('should signal story completion when narrative finishes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    const narrativeEl = fixture.debugElement.query(By.directive(NarrativeText));

    narrativeEl.triggerEventHandler('completed', null);

    expect(spy).toHaveBeenCalledWith(true);
  });
});
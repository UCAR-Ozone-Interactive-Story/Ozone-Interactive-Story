import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { SceneAirPollution } from './scene-air-pollution';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneAirPollution', () => {
  let component: SceneAirPollution;
  let fixture: ComponentFixture<SceneAirPollution>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneAirPollution);
    fixture = TestBed.createComponent(SceneAirPollution);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with only the first narrative text visible', () => {
    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    
    expect(narratives.length).toBe(1);
    expect(narratives[0].componentInstance.textKey()).toBe('SCENES.AIR_POLLUTION.TEXT_1');
    expect(component.showSecondText).toBeFalse();
  });

  it('should show the second narrative text when the first one completes', () => {
    const firstNarrative = fixture.debugElement.query(By.directive(NarrativeText)).componentInstance;
    
    firstNarrative.completed.emit();
    fixture.detectChanges();

    expect(component.showSecondText).toBeTrue();
    
    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    expect(narratives.length).toBe(2);
    expect(narratives[1].componentInstance.textKey()).toBe('SCENES.AIR_POLLUTION.TEXT_2');
  });

  it('should call setSceneCompleted when the second narrative text completes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    
    component.showNextText();
    fixture.detectChanges();

    const secondNarrative = fixture.debugElement
      .query(By.css('.bottom-text'))
      .query(By.directive(NarrativeText)).componentInstance;

    secondNarrative.completed.emit();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should render the pollution elements in the DOM', () => {
    const factory = fixture.debugElement.query(By.css('.factory img'));
    const car = fixture.debugElement.query(By.css('.car img'));
    const overlay = fixture.debugElement.query(By.css('.pollution-overlay'));

    expect(factory).toBeTruthy();
    expect(car).toBeTruthy();
    expect(overlay).toBeTruthy();
  });
});
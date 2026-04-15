import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneUpperOzone } from './scene-upper-ozone';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneUpperOzone', () => {
  let component: SceneUpperOzone;
  let fixture: ComponentFixture<SceneUpperOzone>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneUpperOzone);
    fixture = TestBed.createComponent(SceneUpperOzone);
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
    expect(narratives[0].componentInstance.textKey()).toBe('SCENES.UPPER_OZONE.TEXT_1');
    expect(component.showSecondText).toBeFalse();
  });

  it('should trigger the second narrative when the first one completes', () => {
    const firstNarrative = fixture.debugElement.query(By.directive(NarrativeText));
    
    // simulate first narrative finishing
    firstNarrative.triggerEventHandler('completed', null);
    fixture.detectChanges();

    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    
    expect(component.showSecondText).toBeTrue();
    expect(narratives.length).toBe(2);
    expect(narratives[1].componentInstance.textKey()).toBe('SCENES.UPPER_OZONE.TEXT_2');
    expect(narratives[1].componentInstance.startDelay()).toBe(200);
  });

  it('should complete the scene only after the second narrative finishes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    
    // 1. manually show the second text
    component.showNextText();
    fixture.detectChanges();

    // 2. find the second narrative (it's the one inside the .bottom-text div)
    const secondNarrative = fixture.debugElement.query(
      By.css('.bottom-text app-narrative-text')
    );

    // 3. trigger completion
    secondNarrative.triggerEventHandler('completed', null);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should render the earth and sunrays images', () => {
    const earth = fixture.debugElement.query(By.css('.earth'));
    const sunrays = fixture.debugElement.query(By.css('.sunrays2'));

    expect(earth).toBeTruthy();
    expect(sunrays).toBeTruthy();
    expect(earth.nativeElement.src).toContain('shielded-earth.png');
  });
});
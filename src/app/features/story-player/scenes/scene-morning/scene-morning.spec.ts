import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneMorning } from './scene-morning';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneMorning', () => {
  let component: SceneMorning;
  let fixture: ComponentFixture<SceneMorning>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneMorning);
    fixture = TestBed.createComponent(SceneMorning);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the morning collage image', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain('collage_morning.png');
    expect(img.nativeElement.alt).toBe('cityscape and bright sun');
  });

  it('should pass the correct text key and delay to narrative component', () => {
    const narrativeDebugEl = fixture.debugElement.query(By.directive(NarrativeText));
    const narrativeComponent = narrativeDebugEl.componentInstance as NarrativeText;

    expect(narrativeComponent.textKey()).toBe('SCENES.MORNING.TEXT_1');
    expect(narrativeComponent.startDelay()).toBe(storyServiceMock.transition().textDelay);
  });

  it('should call setSceneCompleted(true) when narrative finishes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    const narrativeDebugEl = fixture.debugElement.query(By.directive(NarrativeText));
    
    // Trigger the @Output() 'completed' event from the child component
    narrativeDebugEl.triggerEventHandler('completed', null);

    expect(spy).toHaveBeenCalledWith(true);
  });
});
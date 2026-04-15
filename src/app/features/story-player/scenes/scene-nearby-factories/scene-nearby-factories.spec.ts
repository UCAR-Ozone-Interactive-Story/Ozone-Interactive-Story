import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneNearbyFactories } from './scene-nearby-factories';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneNearbyFactories', () => {
  let component: SceneNearbyFactories;
  let fixture: ComponentFixture<SceneNearbyFactories>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneNearbyFactories);
    fixture = TestBed.createComponent(SceneNearbyFactories);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the factory scene image with correct attributes', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain('images/scenes/nearby-factories/nearbyfactories.png');
    expect(img.nativeElement.alt).toBe('Nearby factories');
  });

  it('should configure the narrative text with the specific factory key', () => {
    const narrativeEl = fixture.debugElement.query(By.directive(NarrativeText));
    const narrativeInstance = narrativeEl.componentInstance as NarrativeText;

    expect(narrativeInstance.textKey()).toBe('SCENES.NEARBY_FACTORIES.TEXT_1');
    expect(narrativeInstance.startDelay()).toBe(storyServiceMock.transition().textDelay);
  });

  it('should signal the story is complete once the narrative finishes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    const narrativeEl = fixture.debugElement.query(By.directive(NarrativeText));
    
    // Simulate the @Output('completed') event
    narrativeEl.triggerEventHandler('completed', null);

    expect(spy).toHaveBeenCalledWith(true);
  });
});
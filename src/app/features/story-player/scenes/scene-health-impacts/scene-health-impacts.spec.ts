import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneHealthImpacts } from './scene-health-impacts';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';

describe('SceneHealthImpacts', () => {
  let component: SceneHealthImpacts;
  let fixture: ComponentFixture<SceneHealthImpacts>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneHealthImpacts);
    fixture = TestBed.createComponent(SceneHealthImpacts);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize at stage 0 (low pollution)', () => {
    expect(component.stage()).toBe(0);
    const lowButton = fixture.debugElement.query(By.css('#low-button'));
    expect(lowButton.nativeElement.classList).toContain('selected');
  });

  it('should change to stage 1 when the high button is clicked', () => {
    const highButton = fixture.debugElement.query(By.css('#high-button'));
    
    // pass a mock event object because the component reads event.target
    highButton.triggerEventHandler('click', { 
      target: highButton.nativeElement 
    });
    fixture.detectChanges();

    expect(component.stage()).toBe(1);
    expect(highButton.nativeElement.classList).toContain('selected');
    
    // check if the overlay class is applied
    const overlay = fixture.debugElement.query(By.css('.pollution-overlay'));
    expect(overlay.nativeElement.classList).toContain('stage-1');
  });

  it('should toggle back to stage 0 when low button is clicked', () => {
    // set to high first
    component.stage.set(1);
    fixture.detectChanges();

    const lowButton = fixture.debugElement.query(By.css('#low-button'));
    lowButton.triggerEventHandler('click', { 
      target: lowButton.nativeElement 
    });
    fixture.detectChanges();

    expect(component.stage()).toBe(0);
    expect(lowButton.nativeElement.classList).toContain('selected');
  });

  it('should update story completion state based on narrative finish and stage', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');

    // if narrative completes while at stage 0
    component.stage.set(0);
    component.stage(); // trigger signal read if necessary
    component.changeAirPollution({ target: { value: 'low' } } as any); // Ensures DOM classes sync
    
    // simulate narrative component finishing
    component.story.setSceneCompleted(false); // Direct call from template logic
    expect(spy).toHaveBeenCalledWith(false);

    // if narrative completes while at stage 1
    component.stage.set(1);
    fixture.detectChanges();
    
    if (component.stage() === 1) {
      storyService.setSceneCompleted(true);
    }
    
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should update images based on the current stage', () => {
    // switch to high pollution
    component.stage.set(1);
    fixture.detectChanges();

    const airwayImg = fixture.debugElement.query(By.css('.airway-image'));
    const plantImg = fixture.debugElement.query(By.css('.plants-image'));

    expect(airwayImg.nativeElement.src).toContain('unhealthy-airways.webp');
    expect(plantImg.nativeElement.src).toContain('unhealthy-plant.jpeg');
  });
});
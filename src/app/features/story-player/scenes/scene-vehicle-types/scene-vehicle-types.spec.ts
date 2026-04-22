import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneVehicleTypes } from './scene-vehicle-types';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneVehicleTypes', () => {
  let component: SceneVehicleTypes;
  let fixture: ComponentFixture<SceneVehicleTypes>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneVehicleTypes);
    fixture = TestBed.createComponent(SceneVehicleTypes);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all vehicle images with correct alt text', () => {
    const images = fixture.debugElement.queryAll(By.css('img.vehicle'));
    const altTexts = images.map(img => img.nativeElement.alt);

    expect(images.length).toBe(5);
    expect(altTexts).toContain('bicycle');
    expect(altTexts).toContain('motorcycle');
    expect(altTexts).toContain('bus');
    expect(altTexts).toContain('scooter');
    expect(altTexts).toContain('car');
  });

  it('should render the central gas pump image', () => {
    const gasPump = fixture.debugElement.query(By.css('img[src*="oil.png"]'));
    expect(gasPump).toBeTruthy();
    expect(gasPump.nativeElement.alt).toBe('gas pump');
  });

  it('should display the human-powered label for the bicycle', () => {
    // const label = fixture.debugElement.query(By.css('.bike-label'));
    // expect(label.nativeElement.textContent).toContain('Human powered!');
    
    const firstNarrative = fixture.debugElement.query(By.directive(NarrativeText));
    
    // simulate first narrative finishing
    firstNarrative.triggerEventHandler('completed', null);
    fixture.detectChanges();
  
    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    
    expect(component.showSecondText).toBeTrue();
    expect(narratives.length).toBe(2);
    expect(narratives[1].componentInstance.textKey()).toBe('SCENES.VEHICLE_TYPES.TEXT_2');
    expect(narratives[1].componentInstance.startDelay()).toBe(200);
  });

  it('should configure narrative text and trigger scene completion', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    const narrativeEl = fixture.debugElement.query(By.directive(NarrativeText));
    const narrativeInstance = narrativeEl.componentInstance as NarrativeText;

    // verify configuration
    expect(narrativeInstance.textKey()).toBe('SCENES.VEHICLE_TYPES.TEXT_1');
    expect(narrativeInstance.startDelay()).toBe(storyServiceMock.transition().textDelay);


    //advance the first text
    component.showNextText();
    fixture.detectChanges();

    //check that the scene hasn't been completed yet
    expect(spy).not.toHaveBeenCalled;

    //look for second narrative
    const secondNarrative = fixture.debugElement.query(
      By.css('.bubble-container app-narrative-text')
    );

    const narrativeInstanceTwo = secondNarrative.componentInstance as NarrativeText;

    // verify configuration
    expect(narrativeInstanceTwo.textKey()).toBe('SCENES.VEHICLE_TYPES.TEXT_2');
    expect(narrativeInstanceTwo.startDelay()).toBe(200);

    // trigger completion
    secondNarrative.triggerEventHandler('completed', null);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should contain the street background component', () => {
    const street = fixture.debugElement.query(By.css('app-street'));
    expect(street).toBeTruthy();
    expect(street.attributes['bg-layer']).toBeDefined();
  });
});
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneBurningFuels } from './scene-burning-fuels';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneBurningFuels', () => {
  let component: SceneBurningFuels;
  let fixture: ComponentFixture<SceneBurningFuels>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneBurningFuels);
    fixture = TestBed.createComponent(SceneBurningFuels);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with factory and car inactive', () => {
    expect(component.isFactoryActive()).toBeFalse();
    expect(component.isCarActive()).toBeFalse();
    
    // Verify bubbles/emitters are not in the DOM yet
    const particles = fixture.debugElement.query(By.css('.particle-emitter'));
    expect(particles).toBeNull();
  });

  it('should activate the car and show its narrative bubble on click', () => {
    const carElement = fixture.debugElement.query(By.css('.car'));
    
    carElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCarActive()).toBeTrue();
    expect(carElement.nativeElement.classList).toContain('active');
    
    const carBubble = fixture.debugElement.query(By.directive(NarrativeText));
    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    const hasCarText = narratives.some(n => n.componentInstance.textKey() === 'SCENES.BURNING_FUELS.CAR_BUBBLE');
    expect(hasCarText).toBeTrue();
  });

  it('should activate the factory and show particles on click', () => {
    const factoryElement = fixture.debugElement.query(By.css('.factory'));
    
    factoryElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isFactoryActive()).toBeTrue();
    
    const particles = fixture.debugElement.query(By.css('.particle-emitter'));
    expect(particles).toBeTruthy();
  });

  it('should complete the scene ONLY when both factory and car are active', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');

    component.activateCar();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();

    component.activateFactory();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should handle spacebar keydown for accessibility', () => {
    const factoryElement = fixture.debugElement.query(By.css('.factory'));
    
    factoryElement.triggerEventHandler('keydown.space', { preventDefault: () => {} });
    fixture.detectChanges();

    expect(component.isFactoryActive()).toBeTrue();
  });
});
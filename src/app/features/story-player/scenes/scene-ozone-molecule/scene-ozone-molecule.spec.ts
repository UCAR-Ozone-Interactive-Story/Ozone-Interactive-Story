import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { SceneOzoneMolecule } from './scene-ozone-molecule';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';

describe('SceneOzoneMolecule', () => {
  let component: SceneOzoneMolecule;
  let fixture: ComponentFixture<SceneOzoneMolecule>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneOzoneMolecule);
    fixture = TestBed.createComponent(SceneOzoneMolecule);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 0 with the sun being clickable', () => {
    expect(component.step()).toBe(0);
    const sun = fixture.debugElement.query(By.css('.sun'));
    expect(sun.nativeElement.classList).toContain('clickable');
    expect(component.explanationKey()).toBe('SCENES.OZONE_MOLECULE.TEXT_1');
  });

  it('should transition to step 1 when the sun is clicked', () => {
    component.clickSun();
    
    expect(component.step()).toBe(1);
    expect(component.rayActive()).toBeTrue();
    expect(component.explanationKey()).toBe('SCENES.OZONE_MOLECULE.TEXT_2');
  });

  it('should release oxygen and transition to step 2 when NO2 is clicked', () => {
    // advance to step 1 first
    component.step.set(1);
    
    component.clickNO2();

    expect(component.step()).toBe(2);
    expect(component.showNO()).toBeTrue();
    expect(component.oxygenReleased()).toBeTrue();
    expect(component.explanationKey()).toBe('SCENES.OZONE_MOLECULE.TEXT_3');
  });

  it('should form ozone and complete scene after clicking oxygen', fakeAsync(() => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    
    // setup step 2
    component.step.set(2);
    
    component.clickOxygen();
    expect(component.oxygenEnd()).toBeTrue();
    
    // wait for the 500ms formation timeout
    tick(500);

    expect(component.step()).toBe(3);
    expect(component.ozoneFormed()).toBeTrue();
    expect(component.hideO2()).toBeTrue();
    expect(component.explanationKey()).toBe('SCENES.OZONE_MOLECULE.TEXT_4');
    expect(spy).toHaveBeenCalledWith(true);
  }));

  it('should reset the diagram state when clicking the formed ozone at the end', () => {
    // manually push to the end state
    component.step.set(3);
    component.ozoneFormed.set(true);
    
    component.reset();

    expect(component.step()).toBe(0);
    expect(component.ozoneFormed()).toBeFalse();
    expect(component.rayActive()).toBeFalse();
    expect(component.explanationKey()).toBe('SCENES.OZONE_MOLECULE.TEXT_1');
  });

  it('should ignore clicks if the step is incorrect', () => {
    // try to click NO2 while still on step 0
    component.clickNO2();
    expect(component.step()).toBe(0);
    expect(component.oxygenReleased()).toBeFalse();
  });
});
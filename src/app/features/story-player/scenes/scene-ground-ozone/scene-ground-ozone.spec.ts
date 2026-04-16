import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { SceneGroundOzone } from './scene-ground-ozone';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';

describe('SceneGroundOzone', () => {
  let component: SceneGroundOzone;
  let fixture: ComponentFixture<SceneGroundOzone>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneGroundOzone);
    fixture = TestBed.createComponent(SceneGroundOzone);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in the "area" phase with the correct prompt', () => {
    expect(component.currentChoice()).toBe('area');
    expect(component.text()).toBe('SCENES.GROUND_OZONE.AREA.PROMPT');
  });

  it('should apply "incorrect" class and show feedback when wrong option is selected', () => {
    // selection is blocked until narrative is complete
    component.isTextComplete.set(true);
    
    // select "rural" (incorrect for the area phase)
    component.selectArea('rural');
    fixture.detectChanges();

    const ruralOption = fixture.debugElement.query(By.css('.choice-option:first-child'));
    expect(ruralOption.nativeElement.classList).toContain('incorrect');
    expect(component.text()).toBe('SCENES.GROUND_OZONE.AREA.INCORRECT');
    expect(component.showContinue()).toBeFalse();
  });

  it('should apply "correct" class and show continue button when right option is selected', () => {
    component.isTextComplete.set(true);
    
    // select "urban" (correct)
    component.selectArea('urban');
    fixture.detectChanges();

    const urbanOption = fixture.debugElement.query(By.css('.choice-option:last-child'));
    expect(urbanOption.nativeElement.classList).toContain('correct');
    expect(component.text()).toBe('SCENES.GROUND_OZONE.AREA.CORRECT');
    expect(component.showContinue()).toBeTrue();
  });

  it('should transition to the next phase after clicking continue', fakeAsync(() => {
    // narrative must be complete to allow clicking an option
    component.isTextComplete.set(true);
    fixture.detectChanges();

    // select correct area
    component.selectArea('urban');
    
    // must set isTextComplete back to true to make the continue button appear.
    component.isTextComplete.set(true); 
    fixture.detectChanges();
    const continueBtn = fixture.debugElement.query(By.css('.continue-btn'));
    
    if (!continueBtn) {
        throw new Error('Continue button not found in DOM. Check @if conditions.');
    }

    continueBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.fadeState()).toBe('out');

    // fast-forward the transition timeout
    tick(500);
    fixture.detectChanges();

    expect(component.currentChoice()).toBe('season');
    expect(component.fadeState()).toBe('in');
    }));

  it('should complete the scene when the final phase narrative finishes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');

    component.currentChoice.set('density');
    component.isTextComplete.set(true);
    
    component.selectDensity('lots');
    fixture.detectChanges();

    component.onNarrativeCompleted();

    expect(spy).toHaveBeenCalledWith(true);
    expect(component.bottomText()).toBe('SCENES.GROUND_OZONE.CARS_FACTORIES.CORRECT_BOTTOMTEXT');
  });

  it('should ignore clicks if the narrative is not complete', () => {
    component.isTextComplete.set(false);
    
    component.selectArea('urban');
    fixture.detectChanges();

    expect(component.choiceStatus()).toBeNull();
    expect(component.showContinue()).toBeFalse();
  });

  it('should reset textDelay to 0 after the first interaction', () => {
    const transitionSpy = spyOn(storyService, 'transition').and.returnValue({ textDelay: 1000 } as any);
    
    component.textDelay.set(storyService.transition().textDelay);
    expect(component.textDelay()).toBe(1000);
    
    component.isTextComplete.set(true);
    component.selectArea('rural');
    expect(component.textDelay()).toBe(0);
    });
});
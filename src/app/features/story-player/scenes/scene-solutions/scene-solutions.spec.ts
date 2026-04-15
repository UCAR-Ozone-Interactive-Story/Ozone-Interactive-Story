import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneSolutions } from './scene-solutions';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';

describe('SceneSolutions', () => {
  let component: SceneSolutions;
  let fixture: ComponentFixture<SceneSolutions>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneSolutions);
    fixture = TestBed.createComponent(SceneSolutions);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with heavy smog and the prompt text', () => {
    expect(component.smogOpacity()).toBe(1); // No correct choices yet
    expect(component.currentNarrativeKey()).toBe('SCENES.SOLUTIONS.PROMPT');
  });

  it('should open a popup when a situation is clicked', () => {
    const energySituation = component.situations[0];
    component.toggleSituation(energySituation.id);
    fixture.detectChanges();

    expect(component.activeSituationId()).toBe(energySituation.id);
    expect(component.activeSituation()?.id).toBe(energySituation.id);
    
    const popup = fixture.debugElement.query(By.css('.info-popup'));
    expect(popup).toBeTruthy();
  });

  it('should update correctSelectedCount and smogOpacity when a correct action is taken', () => {
    const energySituation = component.situations[0]; // SITUATION_ENERGY
    const correctOption = energySituation.options.find(o => o.isCorrect)!;

    component.takeAction(energySituation.id, correctOption.id);
    fixture.detectChanges();

    expect(component.correctSelectedCount()).toBe(1);
    expect(component.smogOpacity()).toBeLessThan(1);
  });

  it('should increase smogOpacity if an incorrect action is taken', () => {
    // first make one correct choice to move away from 1.0
    component.takeAction('SITUATION_ENERGY', 'RENEWABLE_ENERGY');
    const opacityAfterCorrect = component.smogOpacity();

    // now make one incorrect choice
    component.takeAction('SITUATION_PRODUCTS', 'HIGH_VOC_PRODUCTS');
    fixture.detectChanges();

    expect(component.incorrectSelectedCount()).toBe(1);
    expect(component.smogOpacity()).toBeGreaterThan(opacityAfterCorrect);
  });

  it('should show the "Done" button only after meeting the required threshold', () => {
    // threshold is 4
    for (let i = 0; i < 3; i++) {
        const situation = component.situations[i];
        component.takeAction(situation.id, situation.options[0].id);
    }
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button.action-btn'))).toBeNull();

    // add the 4th one
    const fourthSit = component.situations[3];
    component.takeAction(fourthSit.id, fourthSit.options[0].id);
    fixture.detectChanges();
    
    const doneBtn = fixture.debugElement.query(By.css('button.action-btn'));
    expect(doneBtn).withContext('Done button should appear at 4 selections').toBeTruthy();
    expect(doneBtn.nativeElement.textContent).toContain('SCENES.SOLUTIONS.DONE_BUTTON');
    });

  it('should transition to conclusion text when finishScene is called', () => {
    // simulate finishing
    component.takeAction('SITUATION_ENERGY', 'RENEWABLE_ENERGY');
    component.finishScene();
    fixture.detectChanges();

    expect(component.isDone()).toBeTrue();
    // since we have 1 correct and 0 incorrect, it should be CONCLUSION_PERFECT
    expect(component.currentNarrativeKey()).toBe('SCENES.SOLUTIONS.CONCLUSION_PERFECT');
  });

  it('should signal scene completion once final narrative finishes', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    
    // set state to done
    component.userFinished.set(true);
    component.activeSituationId.set(null);
    fixture.detectChanges();

    component.onFinalNarrativeCompleted();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should allow user to change their selection from the feedback screen', () => {
    const sitId = 'SITUATION_ENERGY';
    component.takeAction(sitId, 'RENEWABLE_ENERGY');
    component.activeSituationId.set(sitId);
    fixture.detectChanges();

    // verify selection exists
    expect(component.selections().has(sitId)).toBeTrue();

    // click "Change" (the secondary action button)
    const changeBtn = fixture.debugElement.query(By.css('.action-btn.secondary'));
    changeBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.selections().has(sitId)).toBeFalse();
  });
});
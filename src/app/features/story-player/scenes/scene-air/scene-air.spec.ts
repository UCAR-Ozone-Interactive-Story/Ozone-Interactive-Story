import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneAir } from './scene-air';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';

describe('SceneAir', () => {
  let component: SceneAir;
  let fixture: ComponentFixture<SceneAir>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneAir);
    fixture = TestBed.createComponent(SceneAir);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with no molecules selected and second text hidden', () => {
    expect(component.selectedMolecules().size).toBe(0);
    expect(component.showSecondText).toBeFalse();
    
    const postChoiceText = fixture.debugElement.query(By.css('.bottom-text'));
    expect(postChoiceText).toBeNull();
  });

  it('should add a molecule to selectedMolecules if correct option is selected', () => {
    const correctOption = { id: 'n2', label: 'N₂', isCorrect: true };
    
    component.onOptionSelected(correctOption);
    
    expect(component.selectedMolecules().has('n2')).toBeTrue();
    expect(component.isMoleculeVisible('n2')).toBeTrue();
  });

  it('should NOT add a molecule to selectedMolecules if incorrect option is selected', () => {
    const incorrectOption = { id: 'f2', label: 'F₂', isCorrect: false };
    
    component.onOptionSelected(incorrectOption);
    
    expect(component.selectedMolecules().has('f2')).toBeFalse();
  });

  it('should update the UI class when a molecule becomes visible', () => {
    // Select N2
    component.onOptionSelected({ id: 'n2', label: 'N₂', isCorrect: true });
    fixture.detectChanges();

    // Find the element for N2 (the first molecule-circle)
    const n2Element = fixture.debugElement.query(By.css('.molecule-circle:nth-child(1)'));
    expect(n2Element.nativeElement.classList).toContain('visible');
  });

  it('should complete the scene when all correct molecules are selected', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    
    const correctOptions = [
      { id: 'n2', label: 'N₂', isCorrect: true },
      { id: 'o2', label: 'O₂', isCorrect: true },
      { id: 'other', label: 'Other', isCorrect: true }
    ];

    // Select all three
    correctOptions.forEach(opt => component.onOptionSelected(opt));
    fixture.detectChanges();

    expect(component.showSecondText).toBeTrue();
    expect(spy).toHaveBeenCalledWith(true);

    // Verify the post-choice narrative text appears
    const postChoiceText = fixture.debugElement.query(By.css('.bottom-text'));
    expect(postChoiceText).not.toBeNull();
  });
});
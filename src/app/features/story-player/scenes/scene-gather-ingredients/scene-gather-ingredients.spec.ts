import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { SceneGatherIngredients } from './scene-gather-ingredients';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

describe('SceneGatherIngredients', () => {
  let component: SceneGatherIngredients;
  let fixture: ComponentFixture<SceneGatherIngredients>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneGatherIngredients);
    fixture = TestBed.createComponent(SceneGatherIngredients);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with no molecules gathered', () => {
    expect(component.moleculesGathered()).toBeFalse();
    expect(component.sunClicked).toBeFalse();
  });

  it('should move a molecule to the ozone cloud via keyboard events', () => {
    // Pick the first molecule (VOC from paint)
    const moleculeEl = fixture.debugElement.query(By.css('#molecule0'));
    
    // Simulate Enter key
    moleculeEl.triggerEventHandler('keydown.enter', { 
      target: moleculeEl.nativeElement,
      preventDefault: () => {} 
    });

    expect(component.molecules[0].location).toBe('ozoneCloud');
  });

  it('should detect when both VOC and NO2 are in the smog cloud', () => {
    const createMockElement = (id: string) => ({
      getAttribute: () => id,
      setAttribute: jasmine.createSpy('setAttribute'),
    });

    const mockVOC = createMockElement('molecule0');
    component.handleKeyPressedToMoveMolecule({ 
      target: mockVOC, 
      preventDefault: () => {} 
    } as any);
    
    expect(component.moleculesGathered()).toBeFalse();

    const mockNO2 = createMockElement('molecule4');
    component.handleKeyPressedToMoveMolecule({ 
      target: mockNO2, 
      preventDefault: () => {} 
    } as any);

    expect(component.moleculesGathered()).toBeTrue();
    
    expect(mockVOC.setAttribute).toHaveBeenCalledWith('inOzoneCloud', 'true');
    expect(mockNO2.setAttribute).toHaveBeenCalledWith('inOzoneCloud', 'true');
  });

  it('should complete the scene after clicking the sun (with delay)', fakeAsync(() => {
    const spy = spyOn(storyService, 'setSceneCompleted');
    
    component.moleculesGathered.set(true);
    fixture.detectChanges();

    const sunButton = fixture.debugElement.query(By.css('.sun'));
    sunButton.nativeElement.click();

    expect(component.sunClicked).toBeTrue();
    expect(spy).not.toHaveBeenCalled();

    tick(600);

    expect(spy).toHaveBeenCalledWith(true);
  }));

  it('should reset drag position if dropped outside ozone cloud', () => {
    const mockDragEvent = {
      dropPoint: { x: 0, y: 0 },
      source: {
        getRootElement: () => document.createElement('div'),
        reset: jasmine.createSpy('reset')
      }
    } as unknown as CdkDragEnd;

    spyOn(component, 'getElementUnder').and.returnValue(null);

    component.handleDragEnd(mockDragEvent);

    expect(mockDragEvent.source.reset).toHaveBeenCalled();
  });

  it('should update molecule location if dropped on ozone cloud', () => {
    const moleculeId = 0;
    const moleculeEl = document.createElement('div');
    moleculeEl.setAttribute('id', `molecule${moleculeId}`);

    const ozoneCloudEl = document.createElement('div');
    ozoneCloudEl.setAttribute('id', 'ozone-cloud');
    
    const mockDragEvent = {
      dropPoint: { x: 100, y: 100 },
      source: {
        getRootElement: () => moleculeEl,
        reset: jasmine.createSpy('reset')
      }
    } as unknown as CdkDragEnd;

    spyOn(document, 'getElementById').and.callFake((id) => {
        if (id === 'ozone-cloud') return ozoneCloudEl;
        return null;
    });
    spyOn(component, 'getElementUnder').and.returnValue(ozoneCloudEl);

    component.handleDragEnd(mockDragEvent);

    expect(component.molecules[moleculeId].location).toBe('ozoneCloud');
    expect(mockDragEvent.source.reset).toHaveBeenCalled();
  });
});
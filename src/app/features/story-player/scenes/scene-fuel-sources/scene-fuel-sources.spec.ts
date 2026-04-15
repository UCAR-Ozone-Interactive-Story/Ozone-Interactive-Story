import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneFuelSources } from './scene-fuel-sources';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';
import { NarrativeText } from '@shared/ui/narrative-text/narrative-text';

describe('SceneFuelSources', () => {
  let component: SceneFuelSources;
  let fixture: ComponentFixture<SceneFuelSources>;
  let storyService: StoryService;

  beforeEach(async () => {
    // Ensure storyServiceMock has resetProgress, setSceneCompleted, etc.
    await setupSceneTestBed(SceneFuelSources);
    fixture = TestBed.createComponent(SceneFuelSources);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with both sources inactive', () => {
    expect(component.isOilActive()).toBeFalse();
    expect(component.isCoalActive()).toBeFalse();
    
    expect(fixture.debugElement.query(By.css('.glow'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.bubble-container'))).toBeNull();
  });

  it('should activate coal and show its narrative bubble on click', () => {
    const coalElement = fixture.debugElement.query(By.css('.coal'));
    
    coalElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isCoalActive()).toBeTrue();
    expect(coalElement.nativeElement.classList).toContain('active');
    
    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    const hasCoalText = narratives.some(n => n.componentInstance.textKey() === 'SCENES.FUEL_SOURCES.COAL_BUBBLE');
    expect(hasCoalText).toBeTrue();
    
    expect(fixture.debugElement.query(By.css('.coal .glow'))).toBeTruthy();
  });

  it('should activate oil and show its narrative bubble on click', () => {
    const oilElement = fixture.debugElement.query(By.css('.oil'));
    
    oilElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isOilActive()).toBeTrue();
    
    const narratives = fixture.debugElement.queryAll(By.directive(NarrativeText));
    const hasOilText = narratives.some(n => n.componentInstance.textKey() === 'SCENES.FUEL_SOURCES.OIL_BUBBLE');
    expect(hasOilText).toBeTrue();
    
    expect(fixture.debugElement.query(By.css('.oil .glow'))).toBeTruthy();
  });

  it('should call setSceneCompleted only after both sources are active', () => {
    const spy = spyOn(storyService, 'setSceneCompleted');

    component.activateOil();
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();

    component.activateCoal();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should handle spacebar keydown for accessibility on interactive objects', () => {
    const oilElement = fixture.debugElement.query(By.css('.oil'));
    
    oilElement.triggerEventHandler('keydown.space', { preventDefault: () => {} });
    fixture.detectChanges();

    expect(component.isOilActive()).toBeTrue();
  });

  it('should stop image animation when a source is active', () => {
    const coalImg = fixture.debugElement.query(By.css('.coal img'));
    
    component.activateCoal();
    fixture.detectChanges();
    
    const coalContainer = fixture.debugElement.query(By.css('.coal'));
    expect(coalContainer.nativeElement.classList).toContain('active');
  });
});
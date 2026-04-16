import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SceneEnd } from './scene-end';
import { setupSceneTestBed, storyServiceMock } from '@testing/scene-test.helpers';
import { By } from '@angular/platform-browser';
import { StoryService } from '@core/story.service';

describe('SceneEnd', () => {
  let component: SceneEnd;
  let fixture: ComponentFixture<SceneEnd>;
  let storyService: StoryService;

  beforeEach(async () => {
    await setupSceneTestBed(SceneEnd);
    fixture = TestBed.createComponent(SceneEnd);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the end headers', () => {
    const header = fixture.debugElement.query(By.css('h1'));
    const subtitle = fixture.debugElement.query(By.css('h3'));

    expect(header).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });

  it('should call resetProgress on StoryService when the button is clicked', () => {
    const spy = spyOn(storyService, 'resetProgress');
    
    const button = fixture.debugElement.query(By.css('.action-btn'));
    button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should display the background and decorative elements', () => {
    const skyGrass = fixture.debugElement.query(By.css('app-sky-grass'));
    const clouds = fixture.debugElement.query(By.css('app-clouds'));
    const sun = fixture.debugElement.query(By.css('.sun'));

    expect(skyGrass).toBeTruthy();
    expect(clouds).toBeTruthy();
    expect(sun).toBeTruthy();

  });
});
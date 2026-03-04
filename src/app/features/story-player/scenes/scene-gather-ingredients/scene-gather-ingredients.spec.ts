import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryService } from '@core/story.service';
import { SceneGatherIngredients } from './scene-gather-ingredients';

describe('SceneGatherIngredients', () => {
  let component: SceneGatherIngredients;
  let fixture: ComponentFixture<SceneGatherIngredients>;

  const mockStoryService = {
    setSceneCompleted: jasmine.createSpy(),
    isSceneCompleted: jasmine.createSpy().and.returnValue(false)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneGatherIngredients],
      providers: [
        { provide: StoryService, useValue: mockStoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SceneGatherIngredients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

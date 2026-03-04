import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SceneVehicleTypes } from './scene-vehicle-types';
import { StoryService } from '@core/story.service';
import { TranslateService } from '@ngx-translate/core';

describe('SceneVehicleTypes', () => {
  let component: SceneVehicleTypes;
  let fixture: ComponentFixture<SceneVehicleTypes>;

  const mockStoryService = {
    transition: () => ({ textDelay: 0 }),
    setSceneCompleted: jasmine.createSpy('setSceneCompleted')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneVehicleTypes],
      providers: [
        { provide: StoryService, useValue: mockStoryService },
        { provide: TranslateService, useValue: { instant: (k: string) => k } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SceneVehicleTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  console.debug();
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SceneMorning } from './scene-morning';
import { StoryService } from '@core/story.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { SceneSunnyDay } from '../scene-sunny-day/scene-sunny-day';

describe('SceneMorning', () => {
  let component: SceneMorning;
  let fixture: ComponentFixture<SceneMorning>;

  const mockStoryService = {
    transition: () => ({ textDelay: 0 }),
    setSceneCompleted: jasmine.createSpy('setSceneCompleted')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SceneMorning,
        SceneSunnyDay,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: StoryService, useValue: mockStoryService },
        { provide: TranslateService, useValue: { instant: (k: string) => k } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SceneMorning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

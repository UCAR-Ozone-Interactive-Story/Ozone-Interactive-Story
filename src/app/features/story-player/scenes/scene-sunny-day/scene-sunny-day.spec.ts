import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneSunnyDay } from './scene-sunny-day';

describe('SceneMorning', () => {
  let component: SceneSunnyDay;
  let fixture: ComponentFixture<SceneSunnyDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneSunnyDay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneSunnyDay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

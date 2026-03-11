import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneMorning } from './scene-morning';

describe('SceneMorning', () => {
  let component: SceneMorning;
  let fixture: ComponentFixture<SceneMorning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneMorning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneMorning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneBurningFuels } from './scene-burning-fuels';

describe('SceneBurningFuels', () => {
  let component: SceneBurningFuels;
  let fixture: ComponentFixture<SceneBurningFuels>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneBurningFuels],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneBurningFuels);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
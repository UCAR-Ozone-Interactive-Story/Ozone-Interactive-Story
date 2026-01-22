import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneVehicleTypes } from './scene-vehicle-types';

describe('SceneVehicleTypes', () => {
  let component: SceneVehicleTypes;
  let fixture: ComponentFixture<SceneVehicleTypes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneVehicleTypes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneVehicleTypes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneVehicleTypes } from './scene-vehicle-types';

describe('SceneVehicleTypes', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneVehicleTypes);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneVehicleTypes);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
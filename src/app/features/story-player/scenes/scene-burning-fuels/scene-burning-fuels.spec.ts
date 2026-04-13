import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneBurningFuels } from './scene-burning-fuels';

describe('SceneBurningFuels', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneBurningFuels);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneBurningFuels);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
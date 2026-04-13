import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneAirPollution } from './scene-air-pollution';

describe('SceneAirPollution', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneAirPollution);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneAirPollution);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
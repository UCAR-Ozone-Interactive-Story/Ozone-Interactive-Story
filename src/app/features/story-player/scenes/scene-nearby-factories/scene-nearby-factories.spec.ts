import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneNearbyFactories } from './scene-nearby-factories';

describe('SceneNearbyFactories', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneNearbyFactories);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneNearbyFactories);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
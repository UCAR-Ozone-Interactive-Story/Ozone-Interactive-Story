import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneAir } from './scene-air';

describe('SceneAir', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneAir);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneAir);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
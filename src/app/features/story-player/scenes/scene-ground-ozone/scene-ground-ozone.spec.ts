import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneGroundOzone } from './scene-ground-ozone';

describe('SceneGroundOzone', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneGroundOzone);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneGroundOzone);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
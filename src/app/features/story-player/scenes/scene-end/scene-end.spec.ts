import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneEnd } from './scene-end';

describe('SceneEnd', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneEnd);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneEnd);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
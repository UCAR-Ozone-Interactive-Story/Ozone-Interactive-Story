import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneSolutions } from './scene-solutions';

describe('SceneSolutions', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneSolutions);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneSolutions);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
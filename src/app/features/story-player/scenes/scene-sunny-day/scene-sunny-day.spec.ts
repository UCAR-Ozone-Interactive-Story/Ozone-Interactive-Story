import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneSunnyDay } from './scene-sunny-day';

describe('SceneSunnyDay', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneSunnyDay);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneSunnyDay);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
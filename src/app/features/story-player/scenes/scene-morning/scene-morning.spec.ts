import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneMorning } from './scene-morning';

describe('SceneMorning', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneMorning);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneMorning);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
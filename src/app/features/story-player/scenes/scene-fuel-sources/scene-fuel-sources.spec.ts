import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneFuelSources } from './scene-fuel-sources';

describe('SceneFuelSources', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneFuelSources);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneFuelSources);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
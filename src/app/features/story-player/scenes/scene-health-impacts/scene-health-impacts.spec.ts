import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneHealthImpacts } from './scene-health-impacts';

describe('SceneHealthImpacts', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneHealthImpacts);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneHealthImpacts);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
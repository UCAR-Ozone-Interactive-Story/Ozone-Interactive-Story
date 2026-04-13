import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneOzoneMolecule } from './scene-ozone-molecule';

describe('SceneGatherIngredients', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneOzoneMolecule);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneOzoneMolecule);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
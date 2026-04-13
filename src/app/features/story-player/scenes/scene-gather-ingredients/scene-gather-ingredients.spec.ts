import { TestBed } from '@angular/core/testing';
import { setupSceneTestBed } from '@testing/scene-test.helpers';
import { SceneGatherIngredients } from './scene-gather-ingredients';

describe('SceneGatherIngredients', () => {
  beforeEach(async () => {
    await setupSceneTestBed(SceneGatherIngredients);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SceneGatherIngredients);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
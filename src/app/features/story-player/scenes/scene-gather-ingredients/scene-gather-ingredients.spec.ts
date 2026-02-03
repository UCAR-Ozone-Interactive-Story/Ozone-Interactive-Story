import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneGatherIngredients } from './scene-gather-ingredients';

describe('SceneGatherIngredients', () => {
  let component: SceneGatherIngredients;
  let fixture: ComponentFixture<SceneGatherIngredients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneGatherIngredients],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneGatherIngredients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

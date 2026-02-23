import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneOzoneIngredients } from './scene-ozone-ingredients';

describe('SceneOzoneIngredients', () => {
  let component: SceneOzoneIngredients;
  let fixture: ComponentFixture<SceneOzoneIngredients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneOzoneIngredients],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneOzoneIngredients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEnd } from './scene-end';

describe('SceneEnd', () => {
  let component: SceneEnd;
  let fixture: ComponentFixture<SceneEnd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneEnd],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneEnd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

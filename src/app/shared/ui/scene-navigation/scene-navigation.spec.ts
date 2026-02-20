import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneNavigation } from './scene-navigation';

describe('SceneNavigation', () => {
  let component: SceneNavigation;
  let fixture: ComponentFixture<SceneNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
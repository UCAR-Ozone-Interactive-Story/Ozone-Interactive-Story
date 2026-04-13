import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneUpperOzone } from './scene-upper-ozone';

describe('SceneUpperOzone', () => {
  let component: SceneUpperOzone;
  let fixture: ComponentFixture<SceneUpperOzone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneUpperOzone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SceneUpperOzone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

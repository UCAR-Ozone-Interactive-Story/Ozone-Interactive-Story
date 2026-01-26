import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneNearbyFactories } from './scene-nearby-factories';

describe('SceneNearbyFactory', () => {
  let component: SceneNearbyFactories;
  let fixture: ComponentFixture<SceneNearbyFactories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneNearbyFactories],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneNearbyFactories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

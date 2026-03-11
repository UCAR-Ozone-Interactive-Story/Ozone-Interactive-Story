import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneFuelSources } from './scene-fuel-sources';

describe('SceneFuelSources', () => {
  let component: SceneFuelSources;
  let fixture: ComponentFixture<SceneFuelSources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneFuelSources],
    }).compileComponents();

    fixture = TestBed.createComponent(SceneFuelSources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

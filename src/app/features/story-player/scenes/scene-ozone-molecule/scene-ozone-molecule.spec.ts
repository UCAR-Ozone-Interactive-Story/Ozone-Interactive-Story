import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OzoneMolecule } from './scene-ozone-molecule';

describe('OzoneMolecule', () => {
  let component: OzoneMolecule;
  let fixture: ComponentFixture<OzoneMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OzoneMolecule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OzoneMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

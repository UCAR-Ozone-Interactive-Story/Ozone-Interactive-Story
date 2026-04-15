import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LayerWrapper } from './layer-wrapper.component';
import { By } from '@angular/platform-browser';

// "test host" to simulate content projection
@Component({
  standalone: true,
  imports: [LayerWrapper],
  template: `
    <app-layer-wrapper>
      <div bg-layer id="test-bg">Background Content</div>
      <div id="test-fg">Foreground Content</div>
    </app-layer-wrapper>
  `
})
class TestHostComponent {}

describe('LayerWrapper', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, LayerWrapper]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project background-layer content into the correct slot', () => {
    const bgElement = fixture.debugElement.query(By.css('#test-bg'));
    
    expect(bgElement).toBeTruthy();
    
    // verify it is a direct child of the background-stage (outside the .foreground div)
    const parent = bgElement.nativeElement.parentElement;
    expect(parent.classList).toContain('background-stage');
  });

  it('should project default content into the foreground container', () => {
    const fgElement = fixture.debugElement.query(By.css('#test-fg'));
    
    expect(fgElement).toBeTruthy();
    
    // verify it is inside the .foreground div
    const parent = fgElement.nativeElement.parentElement;
    expect(parent.classList).toContain('foreground');
  });

  it('should have foreground z-index higher than background', () => {
    const bgStage = fixture.debugElement.query(By.css('.background-stage'));
    const fgStage = fixture.debugElement.query(By.css('.foreground'));

    const bgZ = window.getComputedStyle(bgStage.nativeElement).zIndex;
    const fgZ = window.getComputedStyle(fgStage.nativeElement).zIndex;

    expect(Number(fgZ)).toBeGreaterThan(Number(bgZ));
  });
});
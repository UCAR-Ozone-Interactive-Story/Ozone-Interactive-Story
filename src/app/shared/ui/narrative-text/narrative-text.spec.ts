import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { NarrativeText } from './narrative-text';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('NarrativeText', () => {
  let component: NarrativeText;
  let fixture: ComponentFixture<NarrativeText>;
  let translateService: TranslateService;

  const mockText = 'Hello World';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarrativeText, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(NarrativeText);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    // mock translation response
    spyOn(translateService, 'get').and.returnValue(of(mockText));
  });

  it('should start typing after the startDelay', fakeAsync(() => {
    // set inputs
    fixture.componentRef.setInput('textKey', 'MOCK.KEY');
    fixture.componentRef.setInput('startDelay', 500);
    fixture.detectChanges();

    const p = component.paragraph().nativeElement;
    
    // initial state (during delay)
    expect(p.innerHTML).toBe('');

    // wait for startDelay
    tick(500); 
    fixture.detectChanges();

    // wait for a few characters to type (30ms per char)
    tick(30); 
    expect(p.innerHTML).toBe('H');
    tick(30);
    expect(p.innerHTML).toBe('He');

    tick(1000); 
  }));

  it('should finish typing instantly when advance() is called while typing', fakeAsync(() => {
    fixture.componentRef.setInput('textKey', 'MOCK.KEY');
    fixture.detectChanges();
    tick(0); // start the typing process

    tick(30); // types 'H'
    expect(component.isComplete()).toBeFalse();

    component.advance(); // user clicks to skip
    fixture.detectChanges();

    expect(component.paragraph().nativeElement.innerHTML).toBe(mockText);
    expect(component.isComplete()).toBeTrue();
  }));

  it('should emit completed output automatically when typing is finished', fakeAsync(() => {
    const spy = spyOn(component.completed, 'emit');
    fixture.componentRef.setInput('textKey', 'MOCK.KEY');
    fixture.detectChanges();
    
    // Wait for typewriter to finish (30ms * 11 chars + some padding)
    tick(1000); 
    
    expect(component.isComplete()).toBeTrue();
    expect(spy).toHaveBeenCalled();
    }));

  it('should handle newline characters by converting them to <br>', fakeAsync(() => {
    const multilineText = 'Line 1\nLine 2';
    (translateService.get as jasmine.Spy).and.returnValue(of(multilineText));
    
    fixture.componentRef.setInput('textKey', 'MOCK.KEY');
    fixture.detectChanges();
    tick(0); 

    component.advance(); // skip to end
    fixture.detectChanges();

    expect(component.paragraph().nativeElement.innerHTML).toContain('Line 1<br>Line 2');
  }));

  it('should respond to Space and Enter keys via HostListener', fakeAsync(() => {
    const spy = spyOn(component, 'advance');
    
    // create an event that bubbles and has a valid target
    const event = new KeyboardEvent('keydown', { 
        code: 'Space',
        bubbles: true 
    });

    document.body.dispatchEvent(event);
    
    expect(spy).toHaveBeenCalled();
    }));

  it('should NOT advance if an interactive element (like a button) is focused', fakeAsync(() => {
    const spy = spyOn(component, 'advance');
    
    // create a dummy button and focus it
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    btn.focus();

    const event = new KeyboardEvent('keydown', { code: 'Enter', bubbles: true });
    btn.dispatchEvent(event);
    
    expect(spy).not.toHaveBeenCalled();
    document.body.removeChild(btn);
  }));
});
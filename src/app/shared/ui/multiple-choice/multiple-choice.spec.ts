import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MultipleChoice, SelectorOption } from './multiple-choice';
import { By } from '@angular/platform-browser';

const defaultOptions: SelectorOption[] = [
  { id: 'yes', label: 'Yes', isCorrect: true },
  { id: 'no', label: 'No', isCorrect: false }
];

const customOptions: SelectorOption[] = [
  { id: 'a', label: 'Option A', isCorrect: true },
  { id: 'b', label: 'Option B', isCorrect: false },
  { id: 'c', label: 'Option C', isCorrect: false },
];

describe('MultipleChoice', () => {
  let fixture: ComponentFixture<MultipleChoice>;
  let component: MultipleChoice;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoice],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleChoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should display the default question', () => {
      const h3 = fixture.nativeElement.querySelector('h3');
      expect(h3.textContent).toContain('Is The Sky Blue?');
    });

    it('should render default options', () => {
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items.length).toBe(2);
    });

    it('should not be disabled by default', () => {
      expect(component.disabled()).toBeFalse();
    });

    it('should have no selected options by default', () => {
      expect(component.selectedOptions().size).toBe(0);
    });
  });

  describe('selectOption', () => {
    it('should add option to selectedOptions when clicked', () => {
      component.selectOption('yes');
      expect(component.isSelected('yes')).toBeTrue();
    });

    it('should remove option from selectedOptions when clicked again', () => {
      component.selectOption('yes');
      component.selectOption('yes');
      expect(component.isSelected('yes')).toBeFalse();
    });

    it('should allow multiple options to be selected', () => {
      component.selectOption('yes');
      component.selectOption('no');
      expect(component.isSelected('yes')).toBeTrue();
      expect(component.isSelected('no')).toBeTrue();
    });

    it('should emit optionSelected with the correct option', () => {
      let emitted: SelectorOption | undefined;
      component.optionSelected.subscribe((opt: SelectorOption) => emitted = opt);
      component.selectOption('yes');
      expect(emitted).toEqual({ id: 'yes', label: 'Yes', isCorrect: true });
    });

    it('should not select when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      component.selectOption('yes');
      expect(component.isSelected('yes')).toBeFalse();
    });

    it('should not emit when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      let emitted = false;
      component.optionSelected.subscribe(() => emitted = true);
      component.selectOption('yes');
      expect(emitted).toBeFalse();
    });
  });

  describe('isSelected', () => {
    it('should return false for unselected option', () => {
      expect(component.isSelected('yes')).toBeFalse();
    });

    it('should return true for selected option', () => {
      component.selectOption('yes');
      expect(component.isSelected('yes')).toBeTrue();
    });
  });

  describe('getOptionById', () => {
    it('should return the correct option', () => {
      const option = component.getOptionById('yes');
      expect(option).toEqual({ id: 'yes', label: 'Yes', isCorrect: true });
    });

    it('should return undefined for unknown id', () => {
      expect(component.getOptionById('unknown')).toBeUndefined();
    });
  });

  describe('onKeydown', () => {
    it('should select option on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeydown(event, 'yes');
      expect(component.isSelected('yes')).toBeTrue();
    });

    it('should select option on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ', code: 'Space' });
      component.onKeydown(event, 'yes');
      expect(component.isSelected('yes')).toBeTrue();
    });

    it('should not select option on other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      component.onKeydown(event, 'yes');
      expect(component.isSelected('yes')).toBeFalse();
    });

    it('should not select when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeydown(event, 'yes');
      expect(component.isSelected('yes')).toBeFalse();
    });

    it('should call preventDefault on Enter', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(event, 'preventDefault');
      component.onKeydown(event, 'yes');
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call preventDefault on Space', () => {
      const event = new KeyboardEvent('keydown', { key: ' ', code: 'Space' });
      spyOn(event, 'preventDefault');
      component.onKeydown(event, 'yes');
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should apply selected class when option is selected', () => {
      component.selectOption('yes');
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items[0].classList).toContain('selected');
    });

    it('should apply incorrect class when wrong option is selected', () => {
      component.selectOption('no');
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items[1].classList).toContain('incorrect');
    });

    it('should not apply incorrect class to correct option', () => {
      component.selectOption('yes');
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items[0].classList).not.toContain('incorrect');
    });

    it('should apply disabled class when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      items.forEach((item: Element) => {
        expect(item.classList).toContain('disabled');
      });
    });

    it('should show checkmark icon for correct selected option', () => {
      component.selectOption('yes');
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.result-icon');
      expect(icon.textContent.trim()).toBe('✓');
    });

    it('should show cross icon for incorrect selected option', () => {
      component.selectOption('no');
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.result-icon');
      expect(icon.textContent.trim()).toBe('✗');
    });

    it('should set aria-checked to true when selected', () => {
      component.selectOption('yes');
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items[0].getAttribute('aria-checked')).toBe('true');
    });

    it('should set aria-checked to false when not selected', () => {
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items[0].getAttribute('aria-checked')).toBe('false');
    });

    it('should set aria-disabled when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items[0].getAttribute('aria-disabled')).toBe('true');
    });

    it('should render custom question', () => {
      fixture.componentRef.setInput('question', 'What color is the sky?');
      fixture.detectChanges();
      const h3 = fixture.nativeElement.querySelector('h3');
      expect(h3.textContent).toContain('What color is the sky?');
    });

    it('should render custom options', () => {
      fixture.componentRef.setInput('options', customOptions);
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.choice-item');
      expect(items.length).toBe(3);
    });
  });
});
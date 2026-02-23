import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { LanguageDropdownComponent } from './language-dropdown';

describe('LanguageDropdownComponent', () => {
  let component: LanguageDropdownComponent;
  let fixture: ComponentFixture<LanguageDropdownComponent>;
  let translateService: TranslateService;
  const mockPlatformId = 'browser';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LanguageDropdownComponent,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatSelectModule,
        CommonModule
      ],
      providers: [
        { provide: PLATFORM_ID, useValue: mockPlatformId }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageDropdownComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    // spy on translate.use
    spyOn(translateService, 'use').and.callThrough();

    // spy on localStorage methods
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'lang') return 'es';
      return null;
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedLang from localStorage', () => {
    expect(component.selectedLang).toBe('es');
  });

  it('should call translate.use with selected language on init', () => {
    expect(translateService.use).toHaveBeenCalledWith('es');
  });

  it('should change language when changeLanguage is called', () => {
    component.changeLanguage('en');
    expect(component.selectedLang).toBe('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en');
  });
});

/// <reference types="jasmine" />
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StoryService } from '@core/story.service';

// Fake loader so translate service doesn't need real JSON files
class FakeTranslateLoader implements TranslateLoader {
  getTranslation() { return of({}); }
}

export function createSceneTest<T>(component: Type<T>) {
  describe(component.name, () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          component,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: FakeTranslateLoader }
          }),
        ],
        providers: [
          {
            provide: StoryService,
            useValue: {
              transition: () => ({ textDelay: 0 }),
              isSceneCompleted: () => false,
              setSceneCompleted: () => {},
            }
          }
        ]
      }).compileComponents();
    });

    it('should create', () => {
      const fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
    });
  });
}
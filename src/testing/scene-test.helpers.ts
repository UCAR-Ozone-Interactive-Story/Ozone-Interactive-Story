import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StoryService } from '@core/story.service';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation() { return of({}); }
}

export const storyServiceMock = {
  transition: () => ({ textDelay: 0 }),
  isSceneCompleted: () => false,
  setSceneCompleted: () => {},
};

export async function setupSceneTestBed<T>(component: Type<T>, extraImports: any[] = []) {
  await TestBed.configureTestingModule({
    imports: [
      component,
      ...extraImports,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: FakeTranslateLoader }
      }),
    ],
    providers: [
      { provide: StoryService, useValue: storyServiceMock }
    ]
  }).compileComponents();
}
// src/app/core/scene-test-helper.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StoryService } from './story.service'; // adjust path if needed
import Spy = jasmine.Spy;

export interface SceneTestResult<T> {
  fixture: ComponentFixture<T>;
  component: T;
  mockStoryService: {
    transition: Spy<() => { textDelay: number }>;
    setSceneCompleted: Spy<(...args: any[]) => void>;
  };
  mockTranslateService: Partial<TranslateService>;
}

/**
 * Sets up a standalone scene component for testing
 * Handles StoryService mock and TranslateService for all nested components
 */
export async function setupSceneTest<T>(
  componentClass: new (...args: any[]) => T
): Promise<SceneTestResult<T>> {
  // Mock StoryService
  const mockStoryService = {
    transition: jasmine.createSpy('transition').and.returnValue({ textDelay: 0 }),
    setSceneCompleted: jasmine.createSpy('setSceneCompleted')
  };

  // Mock TranslateService
  const mockTranslateService: Partial<TranslateService> = {
    instant: (key: string) => key
  };

  // Configure TestBed
  await TestBed.configureTestingModule({
    imports: [
      componentClass,
      TranslateModule.forRoot() // provides TranslateService for all nested components
    ],
    providers: [
      { provide: StoryService, useValue: mockStoryService },
      { provide: TranslateService, useValue: mockTranslateService } // optional mock
    ]
  }).compileComponents();

  // Create component
  const fixture = TestBed.createComponent<T>(componentClass);
  const component = fixture.componentInstance;
  fixture.detectChanges();

  return { fixture, component, mockStoryService, mockTranslateService };
}
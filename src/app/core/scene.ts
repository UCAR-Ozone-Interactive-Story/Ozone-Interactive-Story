import { Component, Type } from "@angular/core";

export type SceneType = 'narrative' | 'quiz' | 'interaction';

export interface Scene {
  readonly id: string;
  readonly i18n: string;
  readonly component: Type<Component>;
}

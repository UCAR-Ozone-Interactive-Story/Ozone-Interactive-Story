import { Type } from "@angular/core";

export interface Scene {
  readonly id: string;
  readonly i18n_title: string;
  readonly component: Type<unknown>; // unknown to satisfy ESLint, in future maybe we use a base class for all scenes
}

import { Component, Type } from "@angular/core";

export interface Scene {
  readonly id: string;
  readonly i18n_title: string;
  readonly component: Type<Component>;
}

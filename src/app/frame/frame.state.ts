import { signal } from '@angular/core';

// Application-level shared signal to track which frame is active (1 or 2)
export const selectedFrame = signal<number>(1);

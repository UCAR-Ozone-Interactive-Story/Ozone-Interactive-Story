import { signal } from '@angular/core';

// type for lock object
export type FrameUnlockMap = {
  [key: number]: boolean;   // <-- THIS fixes the error
};

// which frame is selected
export const selectedFrame = signal<number>(1);

// lock state for each frame
export const frameUnlocked = signal<FrameUnlockMap>({
  1: true,
  2: false
});

// function to unlock a frame
export function unlockFrame(n: number) {
  frameUnlocked.update(value => ({
    ...value,
    [n]: true
  }));
}

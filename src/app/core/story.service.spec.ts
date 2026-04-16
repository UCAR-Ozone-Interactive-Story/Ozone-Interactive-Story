import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoryService } from './story.service';

describe('StoryService', () => {
  let service: StoryService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should start at the first scene', () => {
      expect(service.currentScene().id).toBe('morning');
    });

    it('should have correct total scenes count', () => {
      expect(service.totalScenes).toBe(14);
    });

    it('should not be scene completed initially', () => {
      expect(service.isSceneCompleted()).toBeFalse();
    });

    it('should have default fade transition initially', () => {
      const transition = service.transition();
      expect(transition.animationType).toBe('fade');
      expect(transition.textDelay).toBe(1200);
    });
  });

  describe('nextScene', () => {
    it('should advance to the next scene', () => {
      service.nextScene();
      expect(service.currentScene().id).toBe('vehicle-types');
    });

    it('should reset sceneCompleted when advancing', () => {
      service.setSceneCompleted(true);
      service.nextScene();
      expect(service.isSceneCompleted()).toBeFalse();
    });

    it('should not advance past the last scene', () => {
      for (let i = 0; i < service.totalScenes + 5; i++) {
        service.nextScene();
      }
      expect(service.currentIndexValue()).toBe(service.totalScenes - 1);
    });

    it('should unlock the next scene', () => {
      service.nextScene();
      const unlockedIds = service.scenes().map(s => s.id);
      expect(unlockedIds).toContain('vehicle-types');
    });

    it('should save index to localStorage', () => {
      service.nextScene();
      expect(localStorage.getItem('story.currentIndex')).toBe('1');
    });
  });

  describe('prevScene', () => {
    it('should go back to the previous scene', () => {
      service.nextScene();
      service.prevScene();
      expect(service.currentScene().id).toBe('morning');
    });

    it('should not go before the first scene', () => {
      service.prevScene();
      expect(service.currentIndexValue()).toBe(0);
    });

    it('should reset sceneCompleted when going back', () => {
      service.nextScene();
      service.setSceneCompleted(true);
      service.prevScene();
      expect(service.isSceneCompleted()).toBeFalse();
    });
  });

  describe('setSceneCompleted', () => {
    it('should set scene completed to true', () => {
      service.setSceneCompleted(true);
      expect(service.isSceneCompleted()).toBeTrue();
    });

    it('should set scene completed to false', () => {
      service.setSceneCompleted(true);
      service.setSceneCompleted(false);
      expect(service.isSceneCompleted()).toBeFalse();
    });
  });

  describe('jumpTo', () => {
    it('should jump to a scene by id', () => {
      service.jumpTo('sunny-day');
      expect(service.currentScene().id).toBe('sunny-day');
    });

    it('should unlock the scene by default', () => {
      service.jumpTo('sunny-day');
      const unlockedIds = service.scenes().map(s => s.id);
      expect(unlockedIds).toContain('sunny-day');
    });

    it('should not unlock the scene when unlock is false', () => {
      service.jumpTo('sunny-day', false);
      const unlockedIds = service.scenes().map(s => s.id);
      expect(unlockedIds).not.toContain('sunny-day');
    });

    it('should not jump to an invalid scene id', () => {
      const before = service.currentScene().id;
      service.jumpTo('non-existent-scene');
      expect(service.currentScene().id).toBe(before);
    });

    it('should reset sceneCompleted when jumping', () => {
      service.setSceneCompleted(true);
      service.jumpTo('sunny-day');
      expect(service.isSceneCompleted()).toBeFalse();
    });

    it('should save index to localStorage', () => {
      service.jumpTo('sunny-day');
      const savedIndex = Number(localStorage.getItem('story.currentIndex'));
      expect(service.currentIndexValue()).toBe(savedIndex);
    });
  });

  describe('unlockScene', () => {
    it('should add a scene to the unlocked scenes list', () => {
      service.unlockScene('air');
      const unlockedIds = service.scenes().map(s => s.id);
      expect(unlockedIds).toContain('air');
    });

    it('should not add an invalid scene id', () => {
      const before = service.scenes().length;
      service.unlockScene('non-existent');
      expect(service.scenes().length).toBe(before);
    });
  });

  describe('resetProgress', () => {
    it('should reset to the first scene', () => {
      service.nextScene();
      service.nextScene();
      service.resetProgress();
      expect(service.currentScene().id).toBe('morning');
    });

    it('should clear localStorage', () => {
      service.nextScene();
      service.resetProgress();
      expect(localStorage.getItem('story.currentIndex')).toBeNull();
      expect(localStorage.getItem('story.unlockedScenes')).toBeNull();
    });

    it('should only have current scene unlocked after reset', () => {
      service.nextScene();
      service.nextScene();
      service.resetProgress();
      expect(service.scenes().length).toBe(1);
      expect(service.scenes()[0].id).toBe('morning');
    });
  });

  describe('transition', () => {
    it('should return slide-down transition for morning->vehicle-types', () => {
      service.jumpTo('morning');
      service.nextScene();
      const transition = service.transition();
      expect(transition.animationType).toBe('slide-down');
      expect(transition.textDelay).toBe(4000);
    });

    it('should return default fade transition for other scene pairs', () => {
      service.jumpTo('vehicle-types');
      service.nextScene();
      const transition = service.transition();
      expect(transition.animationType).toBe('fade');
      expect(transition.textDelay).toBe(1200);
    });
  });

  describe('localStorage persistence', () => {
    it('should restore scene index from localStorage', () => {
      localStorage.setItem('story.currentIndex', '3');
      localStorage.setItem('story.unlockedScenes', JSON.stringify(['morning', 'vehicle-types', 'nearby-factories', 'burning-fuels']));

      // re-create service to trigger loadFromStorage
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(StoryService);

      expect(freshService.currentIndexValue()).toBe(3);
    });

    it('should handle invalid localStorage data gracefully', () => {
      localStorage.setItem('story.currentIndex', 'not-a-number');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(StoryService);
      expect(freshService.currentScene()).toBeTruthy();
    });

    it('should clamp out-of-bounds index from localStorage', () => {
      localStorage.setItem('story.currentIndex', '9999');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(StoryService);
      expect(freshService.currentIndexValue()).toBe(freshService.totalScenes - 1);
    });
  });
});
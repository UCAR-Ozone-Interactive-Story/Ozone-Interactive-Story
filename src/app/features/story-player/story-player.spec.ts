import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPlayer } from './story-player';

describe('StoryPlayer', () => {
  let component: StoryPlayer;
  let fixture: ComponentFixture<StoryPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

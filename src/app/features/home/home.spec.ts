import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Home } from './home';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation() { return of({}); }
}

describe('Home', () => {
  let component: Home;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Home,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader }
        }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')).toBeTruthy();
  });

  it('should render the start button', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const button = el.querySelector('button.start-btn');
    expect(button).toBeTruthy();
  });

  it('should have routerLink "play" on start button', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const button = el.querySelector('[routerLink]');
    expect(button).toBeTruthy();
  });

  it('should render language dropdown', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-language-dropdown')).toBeTruthy();
  });
});
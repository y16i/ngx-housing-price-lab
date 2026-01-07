import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { Router } from '@angular/router';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have filter constants', () => {
    expect(component.LAYOUTS.length).toBe(6);
    expect(component.LOCATIONS.length).toBe(10);
    expect(component.FLOORS.length).toBe(12);
  });

  it('should initialize filter values as empty strings', () => {
    expect(component.layout).toBe('');
    expect(component.minYear).toBe('');
    expect(component.maxYear).toBe('');
    expect(component.location).toBe('');
    expect(component.floor).toBe('');
    expect(component.loading).toBe(false);
  });

  it('should have LAYOUTS array with expected values', () => {
    expect(component.LAYOUTS).toContain('1DK');
    expect(component.LAYOUTS).toContain('2LDK');
    expect(component.LAYOUTS).toContain('3LDK');
  });

  it('should have LOCATIONS array with expected values', () => {
    expect(component.LOCATIONS).toContain('Shibuya, Tokyo');
    expect(component.LOCATIONS).toContain('Kita, Osaka');
    expect(component.LOCATIONS).toContain('Chuo, Sapporo');
  });

  it('should have FLOORS array with numeric strings', () => {
    expect(component.FLOORS).toContain('1');
    expect(component.FLOORS).toContain('12');
  });

  it('should update form values when changed', () => {
    component.layout = '2LDK';
    component.location = 'Tokyo';
    component.minYear = '2010';
    component.maxYear = '2020';
    component.floor = '3';

    expect(component.layout).toBe('2LDK');
    expect(component.location).toBe('Tokyo');
    expect(component.minYear).toBe('2010');
    expect(component.maxYear).toBe('2020');
    expect(component.floor).toBe('3');
  });

  it('should render form elements', () => {
    const compiled = fixture.nativeElement;
    const selects = compiled.querySelectorAll('select');
    const inputs = compiled.querySelectorAll('input');

    expect(selects.length).toBeGreaterThan(0);
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should have a search button', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');

    expect(button).toBeTruthy();
  });
});

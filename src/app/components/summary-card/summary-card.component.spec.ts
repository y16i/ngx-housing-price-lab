import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummaryCardComponent } from './summary-card.component';
import { Stats } from '../../models/house.model';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  const mockStats: Stats = {
    avg: 50,
    median: 50,
    min: 40,
    max: 60,
    count: 3,
  };

  const mockFilters = {
    layout: '2LDK',
    minYear: '2010',
    maxYear: '2020',
    location: 'Tokyo',
    floor: '3',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default stats', () => {
    expect(component.stats.avg).toBe(0);
    expect(component.stats.median).toBe(0);
    expect(component.stats.min).toBe(0);
    expect(component.stats.max).toBe(0);
    expect(component.stats.count).toBe(0);
  });

  it('should initialize with empty filters', () => {
    expect(component.filters).toEqual({});
  });

  it('should initialize with empty filterText', () => {
    expect(component.filterText).toBe('');
  });

  it('should update stats and filters via setData', () => {
    component.setData(mockStats, mockFilters);

    expect(component.stats).toEqual(mockStats);
    expect(component.filters).toEqual(mockFilters);
  });

  it('should generate filter text with all filters', () => {
    component.setData(mockStats, mockFilters);

    expect(component.filterText).toContain('2LDK');
    expect(component.filterText).toContain('2010-2020y');
    expect(component.filterText).toContain('Tokyo');
    expect(component.filterText).toContain('3F');
  });

  it('should handle partial filters', () => {
    const partialFilters = {
      layout: '1DK',
      minYear: null,
      maxYear: null,
      location: 'Osaka',
      floor: null,
    };

    component.setData(mockStats, partialFilters);

    expect(component.filterText).toContain('1DK');
    expect(component.filterText).toContain('Osaka');
    expect(component.filterText).not.toContain('y'); // No year range
  });

  it('should handle null filters', () => {
    const nullFilters = {
      layout: null,
      minYear: null,
      maxYear: null,
      location: null,
      floor: null,
    };

    component.setData(mockStats, nullFilters);

    expect(component.filterText).toBe('');
  });

  it('should render summary card structure', () => {
    component.setData(mockStats, mockFilters);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const grid = compiled.querySelector('.grid');

    expect(grid).toBeTruthy();
  });

  it('should display filter text when filters exist', () => {
    component.setData(mockStats, mockFilters);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const filterElement = compiled.querySelector('.text-sm.text-gray-600');

    expect(filterElement).toBeTruthy();
  });

  it('should not display filter text when filters are null', () => {
    const nullFilters = {
      layout: null,
      minYear: null,
      maxYear: null,
      location: null,
      floor: null,
    };

    component.setData(mockStats, nullFilters);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const filterElement = compiled.querySelector('.text-sm.text-gray-600');

    expect(filterElement).toBeFalsy();
  });
});

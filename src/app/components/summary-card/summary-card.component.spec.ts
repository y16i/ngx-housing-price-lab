import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { SummaryCardComponent } from './summary-card.component';
import { Stats } from 'models/house.model';

@Component({
  selector: 'app-test-wrapper',
  template: ` <app-summary-card [stats]="stats" [filters]="filters"></app-summary-card> `,
  standalone: true,
  imports: [SummaryCardComponent],
})
class TestWrapperComponent {
  stats: Stats = { avg: 0, median: 0, min: 0, max: 0, count: 0 };
  filters = {};
}

describe('SummaryCardComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let summaryCardComponent: SummaryCardComponent;

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
      imports: [TestWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    summaryCardComponent = fixture.debugElement.query(
      (el) => el.name === 'app-summary-card'
    ).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(summaryCardComponent).toBeTruthy();
  });

  it('should initialize with default stats', () => {
    expect(summaryCardComponent.stats()).toEqual({
      avg: 0,
      median: 0,
      min: 0,
      max: 0,
      count: 0,
    });
  });

  it('should initialize with empty filters', () => {
    expect(summaryCardComponent.filters()).toEqual({});
  });

  it('should update stats via property binding', () => {
    component.stats = mockStats;
    fixture.detectChanges();

    expect(summaryCardComponent.stats()).toEqual(mockStats);
  });

  it('should update filters via property binding', () => {
    component.filters = mockFilters;
    fixture.detectChanges();

    expect(summaryCardComponent.filters()).toEqual(mockFilters);
  });

  it('should generate filter text with all filters', () => {
    component.stats = mockStats;
    component.filters = mockFilters;
    fixture.detectChanges();

    const filterText = summaryCardComponent.filterText();
    expect(filterText).toContain('2LDK');
    expect(filterText).toContain('2010-2020y');
    expect(filterText).toContain('Tokyo');
    expect(filterText).toContain('3F');
  });

  it('should handle partial filters', () => {
    const partialFilters = {
      layout: '1DK',
      minYear: null,
      maxYear: null,
      location: 'Osaka',
      floor: null,
    };

    component.stats = mockStats;
    component.filters = partialFilters;
    fixture.detectChanges();

    const filterText = summaryCardComponent.filterText();
    expect(filterText).toContain('1DK');
    expect(filterText).toContain('Osaka');
    expect(filterText).not.toContain('y'); // No year range
  });

  it('should handle null filters', () => {
    const nullFilters = {
      layout: null,
      minYear: null,
      maxYear: null,
      location: null,
      floor: null,
    };

    component.stats = mockStats;
    component.filters = nullFilters;
    fixture.detectChanges();

    expect(summaryCardComponent.filterText()).toBe('');
  });

  it('should render summary card structure', () => {
    component.stats = mockStats;
    component.filters = mockFilters;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const grid = compiled.querySelector('.grid');

    expect(grid).toBeTruthy();
  });

  it('should display filter text when filters exist', () => {
    component.stats = mockStats;
    component.filters = mockFilters;
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

    component.stats = mockStats;
    component.filters = nullFilters;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const filterElement = compiled.querySelector('.text-sm.text-gray-600');

    expect(filterElement).toBeFalsy();
  });

  it('should display stats values correctly', () => {
    component.stats = mockStats;
    component.filters = mockFilters;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const text = compiled.textContent;

    expect(text).toContain('50');
    expect(text).toContain('40');
    expect(text).toContain('60');
    expect(text).toContain('3 properties');
  });
});

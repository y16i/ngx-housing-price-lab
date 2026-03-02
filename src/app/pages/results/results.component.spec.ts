import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'services/house.service';
import { of, throwError } from 'rxjs';
import { House } from 'models/house.model';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let houseService: HouseService;
  let activatedRoute: ActivatedRoute;

  const mockHouses: House[] = [
    {
      id: 1,
      age_years: 10,
      layout: '2LDK',
      location: 'Tokyo',
      floor: 3,
      price_million_yen: 50,
    },
    {
      id: 2,
      age_years: 15,
      layout: '3LDK',
      location: 'Tokyo',
      floor: 5,
      price_million_yen: 60,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [
        provideEchartsCore({ echarts }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              layout: '2LDK',
              minYear: '2010',
              maxYear: '2020',
              location: 'Tokyo',
              floor: '3',
            }),
          },
        },
        {
          provide: HouseService,
          useValue: {
            getHouses: jasmine.createSpy('getHouses').and.returnValue(of(mockHouses)),
            calcStats: jasmine.createSpy('calcStats').and.returnValue({
              avg: 55,
              median: 55,
              min: 50,
              max: 60,
              count: 2,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    houseService = TestBed.inject(HouseService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.data()).toEqual([]);
    expect(component.loading()).toBe(true);
    expect(component.filters()).toEqual({});
  });

  it('should fetch data on init', () => {
    fixture.detectChanges();

    expect(houseService.getHouses).toHaveBeenCalled();
  });

  it('should load houses from service', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.data().length).toBeGreaterThan(0);
      expect(component.data()).toEqual(mockHouses);
      done();
    }, 0);
  });

  it('should set loading to false after data fetch', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.loading()).toBe(false);
      done();
    }, 0);
  });

  it('should extract filters from query params', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.filters().layout).toBe('2LDK');
      expect(component.filters().location).toBe('Tokyo');
      expect(component.filters().minYear).toBe('2010');
      expect(component.filters().maxYear).toBe('2020');
      expect(component.filters().floor).toBe('3');
      done();
    }, 0);
  });

  it('should calculate stats for houses', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(houseService.calcStats).toHaveBeenCalledWith(mockHouses);
      done();
    }, 0);
  });

  it('should handle null filters from query params', (done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [
        provideEchartsCore({ echarts }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        {
          provide: HouseService,
          useValue: {
            getHouses: jasmine.createSpy('getHouses').and.returnValue(of(mockHouses)),
            calcStats: jasmine.createSpy('calcStats').and.returnValue({
              avg: 55,
              median: 55,
              min: 50,
              max: 60,
              count: 2,
            }),
          },
        },
      ],
    });

    const newFixture = TestBed.createComponent(ResultsComponent);
    const newComponent = newFixture.componentInstance;

    newFixture.detectChanges();

    setTimeout(() => {
      expect(newComponent.filters().layout).toBeNull();
      expect(newComponent.filters().location).toBeNull();
      done();
    }, 0);
  });

  it('should handle price range filter', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      component.handleBarClick({ min: 45, max: 55 });
      fixture.detectChanges();

      expect(component.priceRange()).toEqual({ min: 45, max: 55 });
      expect(component.filteredData.length).toBeGreaterThan(0);
      done();
    }, 0);
  });

  it('should clear price filter when handleClearPriceFilter is called', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      component.handleBarClick({ min: 45, max: 55 });
      expect(component.priceRange()).not.toBeNull();

      component.handleClearPriceFilter();
      expect(component.priceRange()).toBeNull();
      expect(component.filteredData.length).toBe(mockHouses.length);
      done();
    }, 0);
  });

  it('should return all data when no price range is set', () => {
    component.data.set(mockHouses);
    component.priceRange.set(null);

    expect(component.filteredData.length).toBe(mockHouses.length);
    expect(component.filteredData).toEqual(mockHouses);
  });

  it('should filter data by price range', () => {
    component.data.set(mockHouses);
    component.priceRange.set({ min: 45, max: 65 });

    const filtered = component.filteredData;
    expect(filtered.every((h) => h.price_million_yen >= 45 && h.price_million_yen <= 65)).toBe(true);
  });

  it('should open filter modal', () => {
    component.openFilterModal();
    expect(component.isFilterModalOpen()).toBe(true);
  });

  it('should close filter modal', () => {
    component.isFilterModalOpen.set(true);
    component.closeFilterModal();
    expect(component.isFilterModalOpen()).toBe(false);
  });

  it('should reset all filters and price range', () => {
    component.layout.set('2LDK');
    component.minYear.set('2010');
    component.maxYear.set('2020');
    component.location.set('Tokyo');
    component.floor.set('3');
    component.priceRange.set({ min: 45, max: 65 });

    component.handleReset();

    expect(component.layout()).toBe('');
    expect(component.minYear()).toBe('');
    expect(component.maxYear()).toBe('');
    expect(component.location()).toBe('');
    expect(component.floor()).toBe('');
    expect(component.priceRange()).toBeNull();
    expect(component.filters()).toEqual({});
  });

  it('should update filters and reset price range when handleFilterChange is called', () => {
    component.priceRange.set({ min: 45, max: 65 });

    const newFilters = {
      layout: '3LDK',
      minYear: '2015',
      maxYear: '2025',
      location: 'Osaka',
      floor: '5',
    };

    component.handleFilterChange(newFilters);

    expect(component.layout()).toBe('3LDK');
    expect(component.minYear()).toBe('2015');
    expect(component.maxYear()).toBe('2025');
    expect(component.location()).toBe('Osaka');
    expect(component.floor()).toBe('5');
    expect(component.priceRange()).toBeNull(); // Should be reset
    expect(component.filters()).toEqual(newFilters);
  });

  it('should handle error in fetchData', (done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [
        provideEchartsCore({ echarts }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        {
          provide: HouseService,
          useValue: {
            getHouses: jasmine
              .createSpy('getHouses')
              .and.returnValue(
                throwError(() => new Error('API Error'))
              ),
            calcStats: jasmine.createSpy('calcStats').and.returnValue({
              avg: 0,
              median: 0,
              min: 0,
              max: 0,
              count: 0,
            }),
          },
        },
      ],
    });

    const errorFixture = TestBed.createComponent(ResultsComponent);
    const errorComponent = errorFixture.componentInstance;

    errorFixture.detectChanges();

    setTimeout(() => {
      expect(errorComponent.loading()).toBe(false);
      expect(errorComponent.data().length).toBe(0);
      done();
    }, 0);
  });
});

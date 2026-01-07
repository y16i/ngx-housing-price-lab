import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { of } from 'rxjs';
import { House } from '../../models/house.model';
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
    expect(component.data).toEqual([]);
    expect(component.loading).toBe(true);
    expect(component.filters).toEqual({});
  });

  it('should fetch data on init', () => {
    fixture.detectChanges();

    expect(houseService.getHouses).toHaveBeenCalled();
  });

  it('should load houses from service', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.data.length).toBeGreaterThan(0);
      expect(component.data).toEqual(mockHouses);
      done();
    }, 0);
  });

  it('should set loading to false after data fetch', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.loading).toBe(false);
      done();
    }, 0);
  });

  it('should extract filters from query params', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.filters.layout).toBe('2LDK');
      expect(component.filters.location).toBe('Tokyo');
      expect(component.filters.minYear).toBe('2010');
      expect(component.filters.maxYear).toBe('2020');
      expect(component.filters.floor).toBe('3');
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
      expect(newComponent.filters.layout).toBeNull();
      expect(newComponent.filters.location).toBeNull();
      done();
    }, 0);
  });
});

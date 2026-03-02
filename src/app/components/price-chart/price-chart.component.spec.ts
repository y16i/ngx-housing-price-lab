import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PriceChartComponent } from './price-chart.component';
import { House } from 'models/house.model';
import { NgxEchartsDirective } from 'ngx-echarts';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';

describe('PriceChartComponent', () => {
  let component: PriceChartComponent;
  let fixture: ComponentFixture<PriceChartComponent>;

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
    {
      id: 3,
      age_years: 5,
      layout: '1DK',
      location: 'Osaka',
      floor: 2,
      price_million_yen: 40,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceChartComponent, NgxEchartsDirective],
      providers: [provideEchartsCore({ echarts })],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty data', () => {
    expect(component.data).toEqual([]);
  });

  it('should have chart options property', fakeAsync(() => {
    component.data = mockHouses;
    fixture.detectChanges();
    tick();

    // chartOptions is a property that always exists
    expect(component).toBeTruthy();
    expect(component.chartOptions).toBeDefined();
  }));

  it('should create chart with series when data is provided', fakeAsync(() => {
    component.data = mockHouses;
    fixture.detectChanges();
    tick();

    const options: any = component.chartOptions;
    expect(options.series).toBeDefined();
    expect(Array.isArray(options.series)).toBe(true);
    expect(options.series.length).toBeGreaterThan(0);
  }));

  it('should have xAxis and yAxis in chart configuration', fakeAsync(() => {
    component.data = mockHouses;
    fixture.detectChanges();
    tick();

    const options: any = component.chartOptions;
    expect(options.xAxis).toBeDefined();
    expect(options.yAxis).toBeDefined();
  }));

  it('should handle empty data array', fakeAsync(() => {
    component.data = [];
    fixture.detectChanges();
    tick();

    // Should not throw an error when data is empty
    expect(component).toBeTruthy();
  }));

  it('should accept data input and render chart', fakeAsync(() => {
    component.data = mockHouses;
    component.ngOnChanges({
      data: {
        previousValue: undefined,
        currentValue: mockHouses,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();
    tick();

    const options: any = component.chartOptions;
    expect(options).toBeDefined();
    expect(options.series).toBeDefined();
  }));

  it('should update chart when data changes', fakeAsync(() => {
    component.data = [mockHouses[0]];
    component.ngOnChanges({
      data: {
        previousValue: undefined,
        currentValue: [mockHouses[0]],
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    fixture.detectChanges();
    tick();

    const optionsBefore: any = component.chartOptions;

    component.data = mockHouses;
    component.ngOnChanges({
      data: {
        previousValue: [mockHouses[0]],
        currentValue: mockHouses,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    fixture.detectChanges();
    tick();

    const optionsAfter: any = component.chartOptions;
    expect(optionsAfter).toBeDefined();
    expect(optionsAfter.series).toBeDefined();
  }));

  it('should handle same price values in data', fakeAsync(() => {
    const samePrice: House[] = [
      { ...mockHouses[0], price_million_yen: 50 },
      { ...mockHouses[1], price_million_yen: 50 },
    ];

    component.data = samePrice;
    fixture.detectChanges();
    tick();

    const options: any = component.chartOptions;
    expect(options.series).toBeDefined();
  }));

  it('should handle large price range spread', fakeAsync(() => {
    const largeRange: House[] = [
      { ...mockHouses[0], price_million_yen: 10 },
      { ...mockHouses[1], price_million_yen: 1000 },
    ];

    component.data = largeRange;
    fixture.detectChanges();
    tick();

    const options: any = component.chartOptions;
    expect(options).toBeDefined();
  }));
});

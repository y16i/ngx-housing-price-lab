import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceChartComponent } from './price-chart.component';
import { House } from 'models/house.model';
import { NgxEchartsDirective } from 'ngx-echarts';

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
    }).compileComponents();

    fixture = TestBed.createComponent(PriceChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty data', () => {
    expect(component.data).toEqual([]);
    expect(component.chartOptions).toEqual({});
  });
});

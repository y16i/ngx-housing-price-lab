import { TestBed } from '@angular/core/testing';
import { HouseService } from './house.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { House, Filters } from '../models/house.model';

describe('HouseService', () => {
  let service: HouseService;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HouseService],
    });

    service = TestBed.inject(HouseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHouses', () => {
    it('should fetch houses without filters', () => {
      const filters: Filters = {};

      service.getHouses(filters).subscribe((houses) => {
        expect(houses.length).toBe(3);
        expect(houses).toEqual(mockHouses);
      });

      const req = httpMock.expectOne((request) =>
        request.url.includes('https://autovalue-insight-2w7oequsua-an.a.run.app/api/houses')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockHouses);
    });

    it('should fetch houses with layout filter', () => {
      const filters: Filters = { layout: '2LDK' };

      service.getHouses(filters).subscribe((houses) => {
        expect(houses[0].layout).toBe('2LDK');
      });

      const req = httpMock.expectOne((request) => request.url.includes('layout=2LDK'));
      expect(req.request.method).toBe('GET');
      req.flush([mockHouses[0]]);
    });

    it('should fetch houses with multiple filters', () => {
      const filters: Filters = {
        layout: '2LDK',
        location: 'Tokyo',
        minYear: '2010',
        maxYear: '2020',
      };

      service.getHouses(filters).subscribe((houses) => {
        expect(houses.length).toBeGreaterThan(0);
      });

      const req = httpMock.expectOne(
        (request) => request.url.includes('layout=2LDK') && request.url.includes('location=Tokyo')
      );
      expect(req.request.method).toBe('GET');
      req.flush([mockHouses[0]]);
    });
  });

  describe('calcStats', () => {
    it('should calculate correct statistics for multiple houses', () => {
      const stats = service.calcStats(mockHouses);

      expect(stats.count).toBe(3);
      expect(stats.avg).toBe(50); // (50 + 60 + 40) / 3 = 50
      expect(stats.median).toBe(50);
      expect(stats.min).toBe(40);
      expect(stats.max).toBe(60);
    });

    it('should handle empty array', () => {
      const stats = service.calcStats([]);

      expect(stats.count).toBe(0);
      expect(stats.avg).toBe(0);
      expect(stats.median).toBe(0);
      expect(stats.min).toBe(0);
      expect(stats.max).toBe(0);
    });

    it('should calculate correct median for even number of items', () => {
      const houses = mockHouses.slice(0, 2); // Two houses with prices 50 and 60
      const stats = service.calcStats(houses);

      expect(stats.median).toBe(55); // (50 + 60) / 2
    });

    it('should calculate correct median for odd number of items', () => {
      const stats = service.calcStats(mockHouses);

      expect(stats.median).toBe(50);
    });

    it('should handle single house', () => {
      const stats = service.calcStats([mockHouses[0]]);

      expect(stats.count).toBe(1);
      expect(stats.avg).toBe(50);
      expect(stats.median).toBe(50);
      expect(stats.min).toBe(50);
      expect(stats.max).toBe(50);
    });
  });
});

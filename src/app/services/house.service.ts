import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House, Filters } from '../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = 'http://localhost:3000/api/houses';

  constructor(private http: HttpClient) {}

  getHouses(filters: Filters): Observable<House[]> {
    let params = new URLSearchParams();

    if (filters.layout) params.append('layout', filters.layout);
    if (filters.minYear) params.append('minYear', filters.minYear);
    if (filters.maxYear) params.append('maxYear', filters.maxYear);
    if (filters.location) params.append('location', filters.location);
    if (filters.floor) params.append('floor', filters.floor);

    return this.http.get<House[]>(`${this.apiUrl}?${params.toString()}`);
  }

  calcStats(houses: House[]) {
    if (houses.length === 0) {
      return { avg: 0, median: 0, min: 0, max: 0, count: 0 };
    }

    const prices = houses.map((h) => h.price_million_yen);

    // Calculate average
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

    // Calculate median
    const sorted = [...prices].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Get min and max
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { avg, median, min, max, count: prices.length };
  }
}

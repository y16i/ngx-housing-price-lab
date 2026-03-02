import { CommonModule } from '@angular/common';
import { Component, signal, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PriceChartComponent, PriceRange } from 'components/price-chart/price-chart.component';
import { SummaryCardComponent } from 'components/summary-card/summary-card.component';
import { HousesTableComponent } from 'components/houses-table/houses-table.component';
import { FilterSidebarComponent } from 'components/filter-sidebar/filter-sidebar.component';
import { FilterModalComponent } from 'components/filter-modal/filter-modal.component';
import { Filters, House, Stats } from 'models/house.model';
import { HouseService } from 'services/house.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SummaryCardComponent,
    PriceChartComponent,
    HousesTableComponent,
    FilterSidebarComponent,
    FilterModalComponent,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private houseService = inject(HouseService);

  data = signal<House[]>([]);
  stats = signal<Stats>({ avg: 0, median: 0, min: 0, max: 0, count: 0 });
  loading = signal(true);
  filters = signal<Filters>({});
  isFilterModalOpen = signal(false);

  layout = signal('');
  minYear = signal('');
  maxYear = signal('');
  location = signal('');
  floor = signal('');
  priceRange = signal<PriceRange | null>(null);

  constructor() {
    effect(() => {
      this.fetchData();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.layout.set(params['layout'] || '');
      this.minYear.set(params['minYear'] || '');
      this.maxYear.set(params['maxYear'] || '');
      this.location.set(params['location'] || '');
      this.floor.set(params['floor'] || '');

      this.filters.set({
        layout: params['layout'] || null,
        minYear: params['minYear'] || null,
        maxYear: params['maxYear'] || null,
        location: params['location'] || null,
        floor: params['floor'] || null,
      });
    });
  }

  handleFilterChange(filters: Filters) {
    this.layout.set((filters.layout as string) || '');
    this.minYear.set((filters.minYear as string) || '');
    this.maxYear.set((filters.maxYear as string) || '');
    this.location.set((filters.location as string) || '');
    this.floor.set((filters.floor as string) || '');
    this.priceRange.set(null); // Reset price range when filters change
    this.filters.set(filters);
  }

  handleReset() {
    this.layout.set('');
    this.minYear.set('');
    this.maxYear.set('');
    this.location.set('');
    this.floor.set('');
    this.priceRange.set(null);
    this.filters.set({});
  }

  openFilterModal() {
    this.isFilterModalOpen.set(true);
  }

  closeFilterModal() {
    this.isFilterModalOpen.set(false);
  }

  handleBarClick(priceRange: PriceRange) {
    this.priceRange.set(priceRange);
  }

  handleClearPriceFilter() {
    this.priceRange.set(null);
  }

  get filteredData(): House[] {
    const range = this.priceRange();
    if (!range) {
      return this.data();
    }
    return this.data().filter(
      (house) => house.price_million_yen >= range.min && house.price_million_yen <= range.max
    );
  }

  private fetchData() {
    this.loading.set(true);
    this.houseService.getHouses(this.filters()).subscribe({
      next: (houses) => {
        this.data.set(houses);
        const calculatedStats = this.houseService.calcStats(houses);
        this.stats.set(calculatedStats);
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Failed to fetch data:', error);
        this.loading.set(false);
      },
    });
  }
}

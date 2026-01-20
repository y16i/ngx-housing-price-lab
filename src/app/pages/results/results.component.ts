import { CommonModule } from '@angular/common';
import { Component, ViewChild, signal, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PriceChartComponent } from 'components/price-chart/price-chart.component';
import { SummaryCardComponent } from 'components/summary-card/summary-card.component';
import { Filters, House } from 'models/house.model';
import { HouseService } from 'services/house.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule, SummaryCardComponent, PriceChartComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  @ViewChild('summaryCard') summaryCard!: SummaryCardComponent;

  private route = inject(ActivatedRoute);
  private houseService = inject(HouseService);

  data = signal<House[]>([]);
  loading = signal(true);
  filters = signal<Filters>({});

  constructor() {
    effect(() => {
      this.fetchData();
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filters.set({
        layout: params['layout'] || null,
        minYear: params['minYear'] || null,
        maxYear: params['maxYear'] || null,
        location: params['location'] || null,
        floor: params['floor'] || null,
      });
    });
  }

  private fetchData() {
    this.loading.set(true);
    this.houseService.getHouses(this.filters()).subscribe({
      next: (houses) => {
        this.data.set(houses);
        const stats = this.houseService.calcStats(houses);
        if (this.summaryCard) {
          this.summaryCard.setData(stats, this.filters());
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
        this.loading.set(false);
      },
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { House, Filters, Stats } from '../../models/house.model';
import { SummaryCardComponent } from '../../components/summary-card/summary-card.component';
import { PriceChartComponent } from '../../components/price-chart/price-chart.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule, SummaryCardComponent, PriceChartComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  @ViewChild('summaryCard') summaryCard!: SummaryCardComponent;

  data: House[] = [];
  loading = true;
  filters: Filters = {};

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filters = {
        layout: params['layout'] || null,
        minYear: params['minYear'] || null,
        maxYear: params['maxYear'] || null,
        location: params['location'] || null,
        floor: params['floor'] || null,
      };

      this.fetchData();
    });
  }

  private fetchData() {
    this.loading = true;
    this.houseService.getHouses(this.filters).subscribe({
      next: (houses) => {
        this.data = houses;
        const stats = this.houseService.calcStats(houses);
        if (this.summaryCard) {
          this.summaryCard.setData(stats, this.filters);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
        this.loading = false;
      },
    });
  }
}

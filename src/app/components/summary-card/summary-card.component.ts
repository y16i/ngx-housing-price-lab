import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stats } from '../../models/house.model';

interface SummaryCardProps {
  stats: Stats;
  filters: {
    layout?: string | null;
    minYear?: string | null;
    maxYear?: string | null;
    location?: string | null;
    floor?: string | null;
  };
}

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  stats: Stats = { avg: 0, median: 0, min: 0, max: 0, count: 0 };
  filters: SummaryCardProps['filters'] = {};
  filterText = '';

  setData(stats: Stats, filters: SummaryCardProps['filters']) {
    this.stats = stats;
    this.filters = filters;
    this.updateFilterText();
  }

  private updateFilterText() {
    const parts = [
      this.filters.layout && this.filters.layout,
      this.filters.minYear &&
        this.filters.maxYear &&
        `${this.filters.minYear}-${this.filters.maxYear}y`,
      this.filters.location && this.filters.location,
      this.filters.floor && `${this.filters.floor}F`,
    ].filter(Boolean);
    this.filterText = parts.join(' | ');
  }
}

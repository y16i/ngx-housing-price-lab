import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stats } from 'models/house.model';

interface FilterType {
  layout?: string | null;
  minYear?: string | null;
  maxYear?: string | null;
  location?: string | null;
  floor?: string | null;
}

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  stats = input<Stats>({ avg: 0, median: 0, min: 0, max: 0, count: 0 });
  filters = input<FilterType>({});

  filterText = computed(() => {
    const filterVal = this.filters();
    const parts = [
      filterVal.layout && filterVal.layout,
      filterVal.minYear && filterVal.maxYear && `${filterVal.minYear}-${filterVal.maxYear}y`,
      filterVal.location && filterVal.location,
      filterVal.floor && `${filterVal.floor}F`,
    ].filter(Boolean);
    return parts.join(' | ');
  });
}

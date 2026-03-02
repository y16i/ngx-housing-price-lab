import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { House } from 'models/house.model';

type SortColumn = 'location' | 'layout' | 'price' | 'age' | 'floor' | null;
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-houses-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './houses-table.component.html',
  styleUrl: './houses-table.component.scss',
})
export class HousesTableComponent {
  @Input() data: House[] = [];

  sortColumn = signal<SortColumn>(null);
  sortDirection = signal<SortDirection>('asc');

  sortedData = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDirection();
    const houses = this.data;

    if (!col) return houses;

    const sorted = [...houses].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (col) {
        case 'location':
          aVal = a.location;
          bVal = b.location;
          break;
        case 'layout':
          aVal = a.layout;
          bVal = b.layout;
          break;
        case 'price':
          aVal = a.price_million_yen;
          bVal = b.price_million_yen;
          break;
        case 'age':
          aVal = a.age_years;
          bVal = b.age_years;
          break;
        case 'floor':
          aVal = a.floor;
          bVal = b.floor;
          break;
        default:
          return 0;
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return dir === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  });

  handleSort(column: SortColumn) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  getSortIcon(column: SortColumn): string {
    if (this.sortColumn() !== column) {
      return '↕';
    }
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }

  getSortIconColor(column: SortColumn): string {
    if (this.sortColumn() !== column) {
      return 'text-gray-400';
    }
    return 'text-blue-600';
  }
}

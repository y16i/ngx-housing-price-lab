import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Filters } from 'models/house.model';

const LAYOUTS = ['1DK', '2LDK', '3DK', '3LDK', '4LDK', '5LDK'];
const LOCATIONS = [
  'Shibuya, Tokyo',
  'Kita, Osaka',
  'Chuo, Sapporo',
  'Kohoku, Yokohama',
  'Naka, Nagoya',
  'Hakata, Fukuoka',
  'Sakyo, Kyoto',
  'Aoba, Sendai',
  'Chuo, Kobe',
  'Omiya, Saitama',
];
const FLOORS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
})
export class FilterSidebarComponent {
  LAYOUTS = LAYOUTS;
  LOCATIONS = LOCATIONS;
  FLOORS = FLOORS;

  // Inputs
  layout = input('');
  minYear = input('');
  maxYear = input('');
  location = input('');
  floor = input('');

  // Outputs
  filterChange = output<Filters>();
  filterReset = output<void>();

  // Local state for two-way binding
  localLayout = '';
  localMinYear = '';
  localMaxYear = '';
  localLocation = '';
  localFloor = '';

  ngOnInit() {
    this.updateLocalState();
  }

  ngOnChanges() {
    this.updateLocalState();
  }

  private updateLocalState() {
    this.localLayout = this.layout();
    this.localMinYear = this.minYear();
    this.localMaxYear = this.maxYear();
    this.localLocation = this.location();
    this.localFloor = this.floor();
  }

  handleFilterChange() {
    const filters: Filters = {
      layout: this.localLayout || null,
      minYear: this.localMinYear || null,
      maxYear: this.localMaxYear || null,
      location: this.localLocation || null,
      floor: this.localFloor || null,
    };
    this.filterChange.emit(filters);
  }

  handleReset() {
    this.localLayout = '';
    this.localMinYear = '';
    this.localMaxYear = '';
    this.localLocation = '';
    this.localFloor = '';
    this.filterReset.emit();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Filters } from '../../models/house.model';

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
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  LAYOUTS = LAYOUTS;
  LOCATIONS = LOCATIONS;
  FLOORS = FLOORS;

  layout = '';
  minYear = '';
  maxYear = '';
  location = '';
  floor = '';
  loading = false;

  constructor(private router: Router) {}

  handleSearch() {
    this.loading = true;
    try {
      const filters: Filters = {
        layout: this.layout || null,
        minYear: this.minYear || null,
        maxYear: this.maxYear || null,
        location: this.location || null,
        floor: this.floor || null,
      };

      this.router.navigate(['/results'], { queryParams: filters });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      this.loading = false;
    }
  }
}

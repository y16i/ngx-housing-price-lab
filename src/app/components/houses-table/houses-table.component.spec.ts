import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesTableComponent } from './houses-table.component';
import { House } from 'models/house.model';

describe('HousesTableComponent', () => {
  let component: HousesTableComponent;
  let fixture: ComponentFixture<HousesTableComponent>;

  const mockHouses: House[] = [
    {
      id: 1,
      age_years: 5,
      layout: '2LDK',
      location: 'Shibuya, Tokyo',
      floor: 10,
      price_million_yen: 68,
    },
    {
      id: 2,
      age_years: 15,
      layout: '3LDK',
      location: 'Kita, Osaka',
      floor: 7,
      price_million_yen: 52,
    },
    {
      id: 3,
      age_years: 25,
      layout: '1DK',
      location: 'Chuo, Sapporo',
      floor: 3,
      price_million_yen: 18,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HousesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty state when no data', () => {
    component.data = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('No houses to display');
  });

  it('should render table with house data', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Shibuya, Tokyo');
    expect(compiled.textContent).toContain('Kita, Osaka');
    expect(compiled.textContent).toContain('Chuo, Sapporo');
  });

  it('should render table rows for each house', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockHouses.length);
  });

  it('should display correct price format with ¥ symbol', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('¥');
  });

  it('should have header cells for each column', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers.length).toBe(5);
  });

  it('should display floor numbers correctly', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('10');
    expect(compiled.textContent).toContain('7');
    expect(compiled.textContent).toContain('3');
  });

  it('should display age values correctly', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('5');
    expect(compiled.textContent).toContain('15');
    expect(compiled.textContent).toContain('25');
  });

  it('should display house count at bottom', () => {
    component.data = mockHouses;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Showing');
    expect(compiled.textContent).toContain('3');
    expect(compiled.textContent).toContain('houses');
  });

  it('should toggle sort direction when clicking same header twice', () => {
    component.data = mockHouses;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('thead th');
    header.click();
    fixture.detectChanges();
    expect(component.sortColumn()).toBe('location');
    expect(component.sortDirection()).toBe('asc');

    header.click();
    fixture.detectChanges();
    expect(component.sortDirection()).toBe('desc');
  });

  it('should change sort column when clicking different header', () => {
    component.data = mockHouses;
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('thead th');
    headers[2].click();
    fixture.detectChanges();
    expect(component.sortColumn()).toBe('price');
    expect(component.sortDirection()).toBe('asc');
  });

  it('should sort location alphabetically', () => {
    component.data = mockHouses;
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('thead th');
    headers[0].click();
    fixture.detectChanges();

    const sorted = component.sortedData();
    expect(sorted[0].location).toBe('Chuo, Sapporo');
    expect(sorted[1].location).toBe('Kita, Osaka');
    expect(sorted[2].location).toBe('Shibuya, Tokyo');
  });

  it('should sort price numerically', () => {
    component.data = mockHouses;
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('thead th');
    headers[2].click();
    fixture.detectChanges();

    const sorted = component.sortedData();
    expect(sorted[0].price_million_yen).toBe(18);
    expect(sorted[1].price_million_yen).toBe(52);
    expect(sorted[2].price_million_yen).toBe(68);
  });

  it('should sort in descending order when clicking header twice', () => {
    component.data = mockHouses;
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('thead th');
    headers[2].click();
    fixture.detectChanges();
    headers[2].click();
    fixture.detectChanges();

    const sorted = component.sortedData();
    expect(sorted[0].price_million_yen).toBe(68);
    expect(sorted[1].price_million_yen).toBe(52);
    expect(sorted[2].price_million_yen).toBe(18);
  });

  it('should get correct sort icon for location column', () => {
    component.sortColumn.set('location');
    component.sortDirection.set('asc');
    fixture.detectChanges();

    const upIcon = component.getSortIcon('location');
    expect(upIcon).toBe('↑');
  });

  it('should get down arrow icon for descending sort', () => {
    component.sortColumn.set('price');
    component.sortDirection.set('desc');

    const downIcon = component.getSortIcon('price');
    expect(downIcon).toBe('↓');
  });

  it('should get neutral arrow icon for unsorted column', () => {
    component.sortColumn.set('location');
    component.sortDirection.set('asc');

    const neutralIcon = component.getSortIcon('price');
    expect(neutralIcon).toBe('↕');
  });

  it('should handle single house data', () => {
    component.data = [mockHouses[0]];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Showing');
  });

  it('should handle large datasets', () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      age_years: Math.floor(Math.random() * 30),
      layout: '2LDK',
      location: 'Tokyo',
      floor: Math.floor(Math.random() * 10) + 1,
      price_million_yen: Math.floor(Math.random() * 100) + 10,
    }));

    component.data = largeData;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(100);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterModalComponent } from './filter-modal.component';
import { Filters } from 'models/house.model';

describe('FilterModalComponent', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have LAYOUTS constant', () => {
    expect(component.LAYOUTS.length).toBeGreaterThan(0);
    expect(component.LAYOUTS).toContain('1DK');
    expect(component.LAYOUTS).toContain('2LDK');
  });

  it('should have LOCATIONS constant', () => {
    expect(component.LOCATIONS.length).toBeGreaterThan(0);
  });

  it('should have FLOORS constant', () => {
    expect(component.FLOORS.length).toBeGreaterThan(0);
  });

  it('should initialize with empty local state', () => {
    expect(component.localLayout).toBe('');
    expect(component.localMinYear).toBe('');
    expect(component.localMaxYear).toBe('');
    expect(component.localLocation).toBe('');
    expect(component.localFloor).toBe('');
  });

  it('should emit close event when closeModal is called', () => {
    spyOn(component.close, 'emit');

    component.closeModal();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit filterChange with correct values', () => {
    spyOn(component.filterChange, 'emit');

    component.localLayout = '2LDK';
    component.localMinYear = '2010';
    component.localMaxYear = '2020';
    component.localLocation = 'Tokyo';
    component.localFloor = '3';

    component.handleFilterChange();

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        layout: '2LDK',
        minYear: '2010',
        maxYear: '2020',
        location: 'Tokyo',
        floor: '3',
      })
    );
  });

  it('should emit null values for empty filter fields', () => {
    spyOn(component.filterChange, 'emit');

    component.localLayout = '';
    component.localMinYear = '';
    component.localMaxYear = '';
    component.localLocation = '';
    component.localFloor = '';

    component.handleFilterChange();

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        layout: null,
        minYear: null,
        maxYear: null,
        location: null,
        floor: null,
      })
    );
  });

  it('should emit filterReset event when handleReset is called', () => {
    spyOn(component.filterReset, 'emit');

    component.handleReset();

    expect(component.filterReset.emit).toHaveBeenCalled();
  });

  it('should clear local state when handleReset is called', () => {
    component.localLayout = '2LDK';
    component.localMinYear = '2010';
    component.localMaxYear = '2020';
    component.localLocation = 'Tokyo';
    component.localFloor = '3';

    component.handleReset();

    expect(component.localLayout).toBe('');
    expect(component.localMinYear).toBe('');
    expect(component.localMaxYear).toBe('');
    expect(component.localLocation).toBe('');
    expect(component.localFloor).toBe('');
  });

  it('should update local state from input values on ngOnInit', () => {
    // ngOnInit calls updateLocalState which reads from input signals
    // Input signals are empty by default, so local state will be empty
    component.ngOnInit();

    expect(component.localLayout).toBe('');
    expect(component.localMinYear).toBe('');
    expect(component.localMaxYear).toBe('');
    expect(component.localLocation).toBe('');
    expect(component.localFloor).toBe('');
  });

  it('should update local state from input values on ngOnChanges', () => {
    // ngOnChanges calls updateLocalState which reads from input signals
    // Input signals are empty by default, so local state will be empty
    component.ngOnChanges();

    expect(component.localLayout).toBe('');
    expect(component.localMinYear).toBe('');
    expect(component.localMaxYear).toBe('');
    expect(component.localLocation).toBe('');
    expect(component.localFloor).toBe('');
  });

  it('should handle backdrop click to close modal', () => {
    spyOn(component.close, 'emit');

    component.onBackdropClick();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should stop propagation when clicking inside modal', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');

    component.onModalClick(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should toggle between partial and full filters', () => {
    spyOn(component.filterChange, 'emit');

    component.localLayout = '2LDK';
    component.localMinYear = '';
    component.localMaxYear = '';
    component.localLocation = 'Tokyo';
    component.localFloor = '';

    component.handleFilterChange();

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        layout: '2LDK',
        minYear: null,
        maxYear: null,
        location: 'Tokyo',
        floor: null,
      })
    );
  });
});

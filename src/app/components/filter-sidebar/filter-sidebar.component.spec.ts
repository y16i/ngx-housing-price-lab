import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterSidebarComponent } from './filter-sidebar.component';
import { Filters } from 'models/house.model';

describe('FilterSidebarComponent', () => {
  let component: FilterSidebarComponent;
  let fixture: ComponentFixture<FilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have LAYOUTS constant with correct values', () => {
    expect(component.LAYOUTS).toContain('1DK');
    expect(component.LAYOUTS).toContain('1LDK');
    expect(component.LAYOUTS).toContain('2LDK');
    expect(component.LAYOUTS).toContain('3LDK');
  });

  it('should have LOCATIONS constant', () => {
    expect(component.LOCATIONS.length).toBeGreaterThan(0);
    expect(component.LOCATIONS).toContain('Shibuya, Tokyo');
  });

  it('should have FLOORS constant', () => {
    expect(component.FLOORS.length).toBeGreaterThan(0);
  });

  it('should emit filterChange when layout changes', (done) => {
    spyOn(component.filterChange, 'emit');

    const event = {
      target: {
        value: '2LDK',
      },
    } as any;

    component.handleLayoutChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        layout: '2LDK',
      })
    );
    done();
  });

  it('should emit filterChange when minYear changes', (done) => {
    spyOn(component.filterChange, 'emit');

    const event = {
      target: {
        value: '2010',
      },
    } as any;

    component.handleMinYearChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        minYear: '2010',
      })
    );
    done();
  });

  it('should emit filterChange when maxYear changes', (done) => {
    spyOn(component.filterChange, 'emit');

    const event = {
      target: {
        value: '2020',
      },
    } as any;

    component.handleMaxYearChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        maxYear: '2020',
      })
    );
    done();
  });

  it('should emit filterChange when location changes', (done) => {
    spyOn(component.filterChange, 'emit');

    const event = {
      target: {
        value: 'Tokyo',
      },
    } as any;

    component.handleLocationChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        location: 'Tokyo',
      })
    );
    done();
  });

  it('should emit filterChange when floor changes', (done) => {
    spyOn(component.filterChange, 'emit');

    const event = {
      target: {
        value: '5',
      },
    } as any;

    component.handleFloorChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        floor: '5',
      })
    );
    done();
  });

  it('should emit filterReset when handleReset is called', () => {
    spyOn(component.filterReset, 'emit');

    component.handleReset();

    expect(component.filterReset.emit).toHaveBeenCalled();
  });

  it('should clear local state when handleReset is called', () => {
    component.localLayout = '2LDK';
    component.localMinYear = '2010';
    component.localMaxYear = '2020';
    component.localLocation = 'Tokyo';
    component.localFloor = '5';

    component.handleReset();

    expect(component.localLayout).toBe('');
    expect(component.localMinYear).toBe('');
    expect(component.localMaxYear).toBe('');
    expect(component.localLocation).toBe('');
    expect(component.localFloor).toBe('');
  });

  it('should update local state on input signal changes', () => {
    // ngOnInit calls updateLocalState which reads from input signals
    // Input signals are empty by default, so local state will be empty
    component.ngOnInit();

    expect(component.localLayout).toBe('');
    expect(component.localMinYear).toBe('');
    expect(component.localMaxYear).toBe('');
    expect(component.localLocation).toBe('');
    expect(component.localFloor).toBe('');
  });

  it('should emit null values for empty filters', (done) => {
    spyOn(component.filterChange, 'emit');

    const event = {
      target: {
        value: '',
      },
    } as any;

    component.handleLayoutChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        layout: null,
      })
    );
    done();
  });

  it('should preserve other filter values when one changes', (done) => {
    spyOn(component.filterChange, 'emit');

    component.localLayout = '2LDK';
    component.localMinYear = '2010';

    const event = {
      target: {
        value: 'Tokyo',
      },
    } as any;

    component.handleLocationChange(event);

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        layout: '2LDK',
        minYear: '2010',
        location: 'Tokyo',
      })
    );
    done();
  });
});

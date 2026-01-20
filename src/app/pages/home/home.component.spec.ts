import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SearchFormComponent } from 'components/search-form/search-form.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, SearchFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should render SearchFormComponent', () => {
    const compiled = fixture.nativeElement;
    const searchForm = compiled.querySelector('app-search-form');

    expect(searchForm).toBeTruthy();
  });
});

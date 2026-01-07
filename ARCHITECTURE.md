# Architecture Overview

## Component Hierarchy

```
app.component (root)
│
└── router-outlet
    │
    ├── home component (/)
    │   └── search-form component
    │
    └── results component (/results)
        ├── summary-card component
        └── price-chart component
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Angular Application                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐           ┌──────────────────┐       │
│  │  Home Component  │           │ Results Component│       │
│  │                  │           │                  │       │
│  │  ┌────────────┐  │           │ ┌──────────────┐ │       │
│  │  │SearchForm  │  │  Route    │ │SummaryCard   │ │       │
│  │  │ Component  │  ├──────────→│ │  Component   │ │       │
│  │  └────────────┘  │  /results │ └──────────────┘ │       │
│  │                  │ ?filters  │                  │       │
│  │                  │           │ ┌──────────────┐ │       │
│  │                  │           │ │ PriceChart   │ │       │
│  │                  │           │ │  Component   │ │       │
│  │                  │           │ └──────────────┘ │       │
│  └──────────────────┘           └──────────────────┘       │
│           │                             │                  │
│           └─────────────┬───────────────┘                  │
│                         │                                  │
│              ┌──────────▼──────────┐                       │
│              │  HouseService       │                       │
│              │  ─────────────      │                       │
│              │  • getHouses()      │                       │
│              │  • calcStats()      │                       │
│              └──────────┬──────────┘                       │
│                         │                                  │
└─────────────────────────┼──────────────────────────────────┘
                          │ HTTP GET
                          │
          ┌───────────────▼────────────────┐
          │  Next.js Backend               │
          │  (/api/houses)                 │
          │                                │
          │  Query Params:                 │
          │  • layout, minYear, maxYear    │
          │  • location, floor             │
          │                                │
          │  Returns: House[]              │
          └────────────────────────────────┘
```

## Service Layer

```
┌─────────────────────────────────────┐
│      HouseService                   │
├─────────────────────────────────────┤
│                                     │
│  getHouses(filters: Filters)        │
│  → Observable<House[]>              │
│    • Builds query params            │
│    • Calls /api/houses              │
│    • Returns filtered results       │
│                                     │
│  calcStats(houses: House[])         │
│  → Stats                            │
│    • Calculate average price        │
│    • Calculate median               │
│    • Find min/max values            │
│    • Count results                  │
│                                     │
└─────────────────────────────────────┘
```

## Module Dependencies

```
SearchFormComponent
├── CommonModule (ngIf, ngFor, etc.)
├── FormsModule (ngModel)
└── Router (navigation)

ResultsComponent
├── CommonModule
├── RouterModule
├── SummaryCardComponent
├── PriceChartComponent
└── HouseService

SummaryCardComponent
└── CommonModule

PriceChartComponent
├── CommonModule
└── Canvas API
```

## Type System

```
┌──────────────────────────────────────┐
│     house.model.ts                   │
├──────────────────────────────────────┤
│                                      │
│  interface House {                   │
│    id: number                        │
│    age_years: number                 │
│    layout: string                    │
│    location: string                  │
│    floor: number                     │
│    price_million_yen: number         │
│  }                                   │
│                                      │
│  interface Stats {                   │
│    avg: number                       │
│    median: number                    │
│    min: number                       │
│    max: number                       │
│    count: number                     │
│  }                                   │
│                                      │
│  interface Filters {                 │
│    layout?: string | null            │
│    minYear?: string | null           │
│    maxYear?: string | null           │
│    location?: string | null          │
│    floor?: string | null             │
│  }                                   │
│                                      │
└──────────────────────────────────────┘
```

## Routing Structure

```
Routes:
├── '' (home)
│   └── HomeComponent
│       └── SearchFormComponent
│
├── 'results' (results page with query params)
│   └── ResultsComponent
│       ├── SummaryCardComponent
│       └── PriceChartComponent
│
└── '**' (wildcard - redirect to home)
```

## Configuration Flow

```
┌─────────────────────────────────────┐
│     app.config.ts                   │
├─────────────────────────────────────┤
│                                     │
│  Providers:                         │
│  • provideZoneChangeDetection()     │
│  • provideRouter(routes)            │
│  • importProvidersFrom(              │
│      HttpClientModule               │
│    )                                │
│                                     │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     app.component.ts                │
├─────────────────────────────────────┤
│                                     │
│  @Component({                       │
│    standalone: true,                │
│    imports: [RouterOutlet],         │
│    ...                              │
│  })                                 │
│                                     │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  <router-outlet></router-outlet>    │
└─────────────────────────────────────┘
```

## Styling Architecture

```
┌─────────────────────────────────────┐
│     tailwind.config.js              │
├─────────────────────────────────────┤
│  • Content paths                    │
│  • Theme colors                     │
│  • Extended config                  │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     postcss.config.js               │
├─────────────────────────────────────┤
│  • Tailwind plugin                  │
│  • Autoprefixer plugin              │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     src/styles.css                  │
├─────────────────────────────────────┤
│  @tailwind base                     │
│  @tailwind components               │
│  @tailwind utilities                │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Components with Tailwind Classes   │
└─────────────────────────────────────┘
```

## Dependency Injection

```
┌─────────────────────────────────────────────────────────┐
│  Angular Dependency Injection Container                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ProvidedIn: 'root'                                    │
│  ├── HttpClient                                        │
│  └── HouseService                                      │
│      └── Depends on HttpClient                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
         │
         ├─→ HomeComponent (inject Router)
         │
         └─→ ResultsComponent
             ├── inject ActivatedRoute
             ├── inject HouseService
             │   └── HttpClient
             ├── SummaryCardComponent
             └── PriceChartComponent
```

## State Management Pattern

```
┌─────────────────────────────────────┐
│  SearchFormComponent                │
│  ─────────────────────────          │
│  • layout: string (local state)     │
│  • minYear: string                  │
│  • maxYear: string                  │
│  • location: string                 │
│  • floor: string                    │
│  • loading: boolean                 │
│                                     │
│  handleSearch() → Router.navigate()  │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  ResultsComponent                   │
│  ──────────────────────             │
│  • data: House[] (from API)         │
│  • loading: boolean                 │
│  • filters: Filters (from route)    │
│                                     │
│  ngOnInit() → ActivatedRoute.       │
│              queryParams.subscribe()│
│                                     │
│  fetchData() → HouseService.        │
│                getHouses()          │
└─────────────────────────────────────┘
         │
         ├─→ SummaryCardComponent
         │   @Input() stats: Stats
         │   @Input() filters: Filters
         │
         └─→ PriceChartComponent
             @Input() data: House[]
```

## API Communication Pattern

```
Component
    │
    ├─→ service.getHouses(filters)
    │       │
    │       ├─→ Build URLSearchParams
    │       │
    │       ├─→ http.get('/api/houses?...')
    │       │
    │       └─→ Return Observable<House[]>
    │
    └─→ .subscribe({
            next: (houses) => { /* handle data */ },
            error: (error) => { /* handle error */ }
        })
```

---

**This architecture demonstrates:**
- ✅ Component separation of concerns
- ✅ Service-based data management
- ✅ Standalone component pattern
- ✅ Reactive programming with RxJS
- ✅ Type-safe TypeScript
- ✅ Tailwind CSS integration
- ✅ Angular best practices

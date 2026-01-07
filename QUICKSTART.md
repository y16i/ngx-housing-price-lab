# Quick Start Guide - ngx-housing-price-lab

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd /opt/ngx-housing-price-lab
npm install
```

### Step 2: Start the Backend (housing-price-lab)
In another terminal:
```bash
cd /opt/housing-price-lab
npm install
npm run dev
# Backend will run on http://localhost:3000
```

### Step 3: Start the Angular Frontend
```bash
cd /opt/ngx-housing-price-lab
npm start
```

The application will open at `http://localhost:4200`

## 📁 Project Structure Overview

```
ngx-housing-price-lab/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── search-form/     # Filter form component
│   │   │   ├── summary-card/    # Statistics display
│   │   │   └── price-chart/     # Price histogram
│   │   ├── pages/               # Page-level components
│   │   │   ├── home/            # Search page
│   │   │   └── results/         # Results page
│   │   ├── models/              # TypeScript interfaces
│   │   ├── services/            # Business logic
│   │   │   └── house.service.ts # API calls & calculations
│   │   ├── app.routes.ts        # Route definitions
│   │   └── app.config.ts        # App configuration
│   ├── styles.css               # Global Tailwind styles
│   └── index.html               # HTML template
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── angular.json                 # Angular build config
```

## 🔧 Available Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Create production build |
| `npm test` | Run unit tests |

## 🎨 Features Implemented

✅ **Search Form**
- Filter by layout (1DK, 2LDK, etc.)
- Filter by age (min-max years)
- Filter by location
- Filter by floor level

✅ **Results Page**
- Summary statistics (avg, median, min, max)
- Property count
- Price distribution chart
- Responsive grid layout

✅ **Design**
- Tailwind CSS styling
- Responsive mobile design
- Blue accent color (#2563eb)
- Gray color scheme

## 🔌 API Connection

The Angular app communicates with the Next.js backend at:
```
http://localhost:3000/api/houses
```

**Query Parameters:**
- `layout` - Property layout (e.g., "2LDK")
- `minYear` - Minimum age in years
- `maxYear` - Maximum age in years
- `location` - City/area name
- `floor` - Floor number

**Example Request:**
```
GET http://localhost:3000/api/houses?layout=2LDK&minYear=10&maxYear=30
```

## 📊 Component Breakdown

### SearchFormComponent
- Location: `src/app/components/search-form/`
- Two-way binding with FormsModule
- Validates and submits filter parameters
- Navigates to results page with query params

### ResultsComponent
- Location: `src/app/pages/results/`
- Reads query parameters
- Fetches filtered data from backend
- Displays stats and chart
- Loading and empty states

### SummaryCardComponent
- Shows average, median, min, max prices
- Displays sample size
- Shows active filters

### PriceChartComponent
- Canvas-based histogram
- Shows price distribution
- Responsive sizing

## 🎯 Key Concepts

**Standalone Components** - All components use Angular's modern standalone API
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  // ...
})
```

**Services with Observables** - HouseService provides Observable streams
```typescript
getHouses(filters: Filters): Observable<House[]>
```

**Type Safety** - Full TypeScript with interfaces
```typescript
interface House {
  id: number;
  age_years: number;
  layout: string;
  location: string;
  floor: number;
  price_million_yen: number;
}
```

## 🚀 Portfolio Showcase

This project demonstrates:

1. **Angular 18 Mastery**
   - Standalone components (no NgModules)
   - Angular Router for navigation
   - Dependency injection

2. **TypeScript Excellence**
   - Interfaces for type safety
   - Proper typing throughout

3. **Modern Tooling**
   - Tailwind CSS for styling
   - Angular CLI development

4. **Frontend Best Practices**
   - Component composition
   - Service-based architecture
   - Observable patterns

5. **API Integration**
   - HttpClient for REST calls
   - Query parameter handling
   - Error handling

## 🎓 Learning Resources

- [Angular Documentation](https://angular.dev)
- [Angular Router Guide](https://angular.dev/guide/routing)
- [Standalone Components](https://angular.dev/guide/standalone-components)
- [Tailwind CSS](https://tailwindcss.com)

## 🐛 Troubleshooting

**Port 4200 already in use?**
```bash
npm start -- --port 4300
```

**Backend not responding?**
- Ensure housing-price-lab is running on port 3000
- Check CORS settings if needed
- Verify API endpoint in `house.service.ts`

**Styles not loading?**
```bash
# Rebuild Tailwind
npm run build
```

## 📝 Notes

- This is a **frontend-only** project
- Requires the housing-price-lab backend to be running
- Uses dummy data from the backend
- All prices are in millions of yen (¥)
- Locations are Japanese cities

## 🤝 Next Steps

1. Run the application
2. Test the search functionality
3. Review the code structure
4. Customize as needed

---

**Happy coding!** 🎉

For detailed documentation, see [README.md](README.md)

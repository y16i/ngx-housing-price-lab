# Housing Price Lab - Angular Frontend

A modern Angular frontend application for analyzing and visualizing housing price data. This project is built to showcase proficiency with both **Next.js** (backend) and **Angular** (frontend) frameworks.

## Project Overview

This is a standalone Angular frontend that consumes the API from the [housing-price-lab](../housing-price-lab) Next.js backend project. It provides the same user interface and functionality as the Next.js version but demonstrates expertise with Angular's modern standalone component architecture.

### Features

- **Search & Filter**: Filter housing data by layout, age, location, and floor level
- **Price Analysis**: View average price, median, min, and max values
- **Data Visualization**: Interactive histogram showing price distribution
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Type-Safe**: Full TypeScript implementation with proper interfaces

### Technology Stack

- **Framework**: Angular 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charting**: Canvas-based charts (no external dependencies)
- **Package Manager**: npm
- **Architecture**: Standalone components (Angular 18+ pattern)

## Project Structure

```
src/
├── app/
│   ├── components/           # Standalone components
│   │   ├── search-form/     # Search and filter form
│   │   ├── summary-card/    # Statistics display cards
│   │   └── price-chart/     # Price distribution chart
│   ├── models/              # TypeScript interfaces
│   │   └── house.model.ts   # House and Filters interfaces
│   ├── pages/               # Page components
│   │   ├── home/            # Home/search page
│   │   └── results/         # Results page
│   ├── services/            # Angular services
│   │   └── house.service.ts # API communication
│   ├── app.config.ts        # App configuration
│   ├── app.routes.ts        # Routing configuration
│   └── app.component.ts     # Root component
├── styles.css              # Global styles with Tailwind
└── index.html              # HTML entry point
```

## Getting Started

### Prerequisites

- Node.js (v20.9.0 or higher)
- npm (v10.1.0 or higher)
- Running Next.js backend on `http://localhost:3000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open in browser**
   Navigate to `http://localhost:4200` (default Angular dev server port)

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run linter (if configured)

## Development Features

### Standalone Components
All components in this project use Angular's standalone component architecture:
- No NgModule needed
- Direct imports in components
- Modern and cleaner code structure

### Services
The `HouseService` handles:
- API communication with the Next.js backend
- Statistical calculations (average, median, min, max)
- Filter parameter handling

### Routing
Two main routes:
- `/` - Home page with search form
- `/results?...` - Results page with filters applied

### Forms
Uses Angular's `FormsModule` with `ngModel` for two-way binding in the search form.

## Configuration

### API Endpoint
Update the API URL in `src/app/services/house.service.ts`:
```typescript
private apiUrl = 'http://localhost:3000/api/houses';
```

### Tailwind CSS
Configuration files:
- `tailwind.config.js` - Theme and content configuration
- `postcss.config.js` - PostCSS plugins
- `src/styles.css` - Global styles with Tailwind directives

## Backend Integration

This frontend expects the Next.js backend to provide:
- **API Endpoint**: `GET /api/houses`
- **Query Parameters**: `layout`, `minYear`, `maxYear`, `location`, `floor`
- **Response**: Array of House objects with properties: `id`, `age_years`, `layout`, `location`, `floor`, `price_million_yen`

See [housing-price-lab](../housing-price-lab) for backend setup.

## Styling Guide

- **Color Scheme**:
  - Primary Blue: `#2563eb`
  - Background: White (`#ffffff`)
  - Cards: Gray (`#f5f5f5`)
  - Text: Gray-900 (`#111827`)

- **Layout**:
  - Max width: 900px (on results page, 2xl for home)
  - Centered with responsive padding
  - Mobile-first approach

- **Components**:
  - Buttons: Rounded corners (12px), shadow, hover effects
  - Cards: Rounded (rounded-xl), subtle shadows
  - Forms: Accessible with labels and proper spacing

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory. Deploy to any static hosting service (Firebase Hosting, Vercel, Netlify, etc.).

## Key Differences from Next.js Version

| Aspect | Next.js | Angular |
|--------|---------|---------|
| Framework | Next.js 15 | Angular 18 |
| Components | React | Angular Components |
| Routing | Next.js Pages | Angular Router |
| State | React Hooks | Angular Services |
| Forms | React useState | Angular FormsModule |
| Styling | Tailwind + CSS Modules | Tailwind CSS |
| Build | Next.js build | Angular build |

## Portfolio Highlights

This project demonstrates:
1. **Angular Expertise**: Modern standalone components, Angular Router, Services
2. **TypeScript Skills**: Proper typing, interfaces, type safety
3. **Frontend Architecture**: Component composition, separation of concerns
4. **Tailwind CSS**: Responsive design, utility-first styling
5. **API Integration**: HttpClient, Observable patterns
6. **Data Visualization**: Canvas charts without external libraries
7. **Form Handling**: Two-way binding, form validation

## License

Same as [housing-price-lab](../housing-price-lab) project

## Related Projects

- [housing-price-lab](../housing-price-lab) - Next.js backend + React frontend
- Shows capability with multiple frameworks and full-stack development

---

**Built for portfolio demonstration** • Showcasing Angular + Next.js expertise

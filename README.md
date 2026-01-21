# Demo: Housing Price Analysis
A Angular frontend application for analyzing housing prices with filtering and visualization using Echarts. The backend is Next.js project housing-price-lab repo.

### Tech Stack

- **Frontend**: Angular 12, TypeScript, Tailwind CSS, Echart

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

## Quick Start

### 1. Install Dependencies
   ```bash
   npm install
   ```

### 2. Run Locally
   ```bash
   npm start
   ```

Visit `http://localhost:4200`

## Related Project

- [housing-price-lab](https://github.com/y16i/housing-price-lab) - Next.js backend + React frontend


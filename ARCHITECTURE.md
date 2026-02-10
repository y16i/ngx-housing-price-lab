# ngx-Housing Price Lab - Architecture Diagram

```mermaid
graph TB
    Browser["🖥️ Web Browser"]
    
    subgraph Angular["Angular App"]
        Router["Router<br/>Home, Results"]
        AppComponent["AppComponent<br/>Root Component"]
        Pages["Pages<br/>Home, Results"]
        Components["Components<br/>Search, Chart<br/>Filter, Summary"]
    end
    
    subgraph Services["Services"]
        HouseService["HouseService<br/>Fetch & Calculate"]
        ConfigService["ConfigService<br/>API Config"]
    end
    
    subgraph Data["Data"]
        API["External API<br/>/api/houses"]
    end
    
    subgraph Tools["Tools & Libraries"]
        ECharts["ngx-echarts<br/>Visualization"]
        Tailwind["Tailwind CSS<br/>Styling"]
        RxJS["RxJS<br/>Async Streams"]
    end
    
    Infra["☁️ Docker + Cloud Run"]
    Testing["Karma + Jasmine<br/>Unit Tests"]
    
    Browser -->|Navigate| Router
    Router --> AppComponent
    AppComponent --> Pages
    Pages --> Components
    Components -->|Inject| HouseService
    Components -->|Inject| ConfigService
    HouseService -->|HTTP| API
    Components -->|Render| ECharts
    Components -->|Style| Tailwind
    HouseService -->|Observable| RxJS
    Angular -->|Deploy to| Infra
    Components -->|Tested| Testing
```

## Overview

ngx-Housing Price Lab is an Angular 21 application for analyzing housing prices with filtering and visualization capabilities.

## Architecture Components

### Frontend
- **Router**: Angular routing for Home and Results pages
- **AppComponent**: Standalone root component
- **Pages**: Home and Results page components
- **Components**: Reusable components for search, charts, filters, and summary cards
- **Styling**: Tailwind CSS for responsive design

### Services (Dependency Injection)
- **HouseService**: Handles API calls to fetch houses and calculates statistics (avg, median, min, max)
- **ConfigService**: Manages API endpoint configuration

### Data Layer
- **External API**: Calls to `/api/houses` endpoint with filter parameters

### External Libraries
- **ngx-echarts**: Angular wrapper for ECharts visualization
- **Tailwind CSS**: Utility-first CSS framework
- **RxJS**: Reactive programming with Observables for async operations

### Testing & Quality
- **Karma**: Test runner
- **Jasmine**: Testing framework

### Infrastructure
- **Docker**: Containerization
- **Google Cloud Run**: Serverless deployment

# Deployment Guide - Housing Price Lab Angular

This guide explains how to deploy the Angular frontend to various platforms.

## Prerequisites

- Angular project built and tested locally
- Backend API accessible from deployment environment
- Environment variables configured appropriately

## Production Build

```bash
npm run build
```

This creates optimized production code in the `dist/` directory.

## Deployment Options

### 1. Firebase Hosting (Recommended)

**Setup:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

**Deploy:**
```bash
npm run build
firebase deploy
```

### 2. Vercel

**Setup:**
```bash
npm i -g vercel
vercel
```

**Deploy:**
```bash
vercel --prod
```

### 3. Netlify

**Setup:**
```bash
npm install -g netlify-cli
netlify login
netlify init
```

**Deploy:**
```bash
npm run build
netlify deploy --prod --dir=dist/ngx-housing-price-lab
```

### 4. GitHub Pages

Create `angular.json` build configuration:
```json
{
  "projects": {
    "ngx-housing-price-lab": {
      "architect": {
        "build": {
          "options": {
            "baseHref": "/ngx-housing-price-lab/"
          }
        }
      }
    }
  }
}
```

**Deploy:**
```bash
npm run build -- --base-href /ngx-housing-price-lab/
```

### 5. Cloud Run (GCP)

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npx", "http-server", "dist/ngx-housing-price-lab", "-p", "8080"]
```

**Deploy:**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/ngx-housing-price-lab
gcloud run deploy ngx-housing-price-lab --image gcr.io/PROJECT_ID/ngx-housing-price-lab
```

## Environment Configuration

### API Endpoint Setup

The API URL is configured in [src/app/services/house.service.ts](src/app/services/house.service.ts):

```typescript
export class HouseService {
  private apiUrl = 'https://autovalue-insight-2w7oequsua-an.a.run.app/api/houses';
  // ...
}
```

To change the backend API URL:
1. Update the `apiUrl` value in `src/app/services/house.service.ts`
2. Rebuild the application: `npm run build`
3. Redeploy the Docker container

For different environments (local dev vs production), you can:
- **Local dev**: Change `apiUrl` to `http://localhost:3000/api/houses`
- **Production**: Change `apiUrl` to your deployed Next.js backend URL

## CORS Configuration

If deploying to a different domain, ensure the backend allows CORS:

In Next.js backend (`housing-price-lab/app/api/houses/route.ts`):
```typescript
// Add CORS headers
response.headers.set('Access-Control-Allow-Origin', 'https://your-frontend-domain.com');
response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
```

## Build Optimization

### Reduce Bundle Size

```bash
# Analyze bundle
npm install -D @angular-eslint/builder
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/ngx-housing-price-lab/browser/stats.json
```

### Enable Compression

Add to `angular.json`:
```json
{
  "optimization": true,
  "sourceMap": false,
  "namedChunks": false,
  "aot": true,
  "extractLicenses": true,
  "vendorChunk": false
}
```

## Performance Tips

1. **Lazy Loading Routes** (if added):
```typescript
const routes: Routes = [
  {
    path: 'results',
    loadComponent: () => import('./pages/results/results.component').then(m => m.ResultsComponent)
  }
];
```

2. **Image Optimization**:
   - Use WebP format where possible
   - Implement responsive images

3. **Caching Headers**:
   - Set cache headers for static assets
   - Use service workers for PWA capabilities

## Monitoring & Analytics

### Add Google Analytics

```bash
npm install @angular/google-analytics
```

### Error Tracking (Sentry)

```bash
npm install @sentry/angular
```

## Testing Before Deploy

```bash
# Build and serve locally
npm run build
npx http-server dist/ngx-housing-price-lab

# Test at http://localhost:8080
```

## Rollback Procedure

### Firebase
```bash
firebase deploy:sites:list
firebase deploy --version=<VERSION>
```

### Vercel
```bash
vercel rollback
```

### Netlify
```bash
netlify deploy --prod --alias=rollback --dir=dist/ngx-housing-price-lab
```

## SSL/HTTPS

All major deployment platforms provide free SSL certificates:
- Firebase Hosting: Automatic
- Vercel: Automatic
- Netlify: Automatic
- GitHub Pages: Automatic for *.github.io domains

## Domain Configuration

Point your domain's DNS records to your deployment platform:
- Firebase: Google Cloud DNS
- Vercel: Vercel nameservers
- Netlify: Netlify nameservers

## Health Checks

Monitor your deployment:

```bash
# Simple health check script
curl -I https://your-deployment-url.com/
```

## Troubleshooting

### Build fails
```bash
npm cache clean --force
rm -rf node_modules dist
npm install
npm run build
```

### CORS errors in production
- Check API URL configuration
- Verify backend CORS headers
- Test with curl/Postman

### Styles not loading
```bash
npm run build -- --configuration=production
```

### JavaScript not executing
- Check browser console for errors
- Verify all imports are correct
- Check Angular version compatibility

## CI/CD Integration

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: firebase/action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

---

For specific deployment platform documentation:
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Angular Deployment Guide](https://angular.dev/guide/deployment)

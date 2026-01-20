import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('/config.json'))
      .then((data: any) => {
        this.config = data;
        console.log('Config loaded:', this.config);
      })
      .catch((error) => {
        console.error('Failed to load config.json:', error);
        // Fallback to default config
        this.config = {
          apiUrl: 'http://localhost:3000/api/houses',
        };
      });
  }

  getApiUrl(): string {
    return this.config?.apiUrl || 'http://localhost:3000/api/houses';
  }
}

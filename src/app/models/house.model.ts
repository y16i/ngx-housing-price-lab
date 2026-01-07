export interface House {
  id: number;
  age_years: number;
  layout: string;
  location: string;
  floor: number;
  price_million_yen: number;
}

export interface Stats {
  avg: number;
  median: number;
  min: number;
  max: number;
  count: number;
}

export interface Filters {
  layout?: string | null;
  minYear?: string | null;
  maxYear?: string | null;
  location?: string | null;
  floor?: string | null;
}

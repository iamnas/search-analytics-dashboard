export interface SearchQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface TimeSeriesData {
  date: string;
  clicks: number;
  impressions: number;
}

export interface SearchAnalyticsData {
  topQueries: SearchQuery[];
  timeSeries: TimeSeriesData[];
}

export interface SearchAnalyticsVariables {
  startDate: string;
  endDate: string;
  queryFilter?: string;
}

export type SortField = keyof SearchQuery;
export type SortDirection = 'asc' | 'desc';

export interface TableSort {
  field: SortField;
  direction: SortDirection;
}
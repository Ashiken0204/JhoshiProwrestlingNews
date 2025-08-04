export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  thumbnail: string;
  publishedAt: string;
  detailUrl: string;
  organization: string;
  sourceUrl: string;
}

export interface Organization {
  name: string;
  displayName: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  timestamp: string;
  error?: string;
}

export interface Statistics {
  total: number;
  byOrganization: Record<string, number>;
  latestUpdate: string;
}
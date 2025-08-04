import { NewsItem, Organization, ApiResponse, Statistics } from '@/types/news';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-function-app.azurewebsites.net/api'
  : '/api';

export class NewsAPI {
  private static async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }

  static async getNews(organization?: string, limit: number = 20): Promise<NewsItem[]> {
    const params = new URLSearchParams();
    if (organization && organization !== 'all') {
      params.append('organization', organization);
    }
    params.append('limit', limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/news${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.fetchApi<NewsItem[]>(endpoint);
    return response.data;
  }

  static async getOrganizations(): Promise<Organization[]> {
    const response = await this.fetchApi<Organization[]>('/organizations');
    return response.data;
  }

  static async getStatistics(): Promise<Statistics> {
    const response = await this.fetchApi<Statistics>('/statistics');
    return response.data;
  }
}
import { NewsItem, Organization, ApiResponse, Statistics } from '@/types/news';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://func-jhoshi-news.azurewebsites.net/api'
  : '/api';

async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
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

export async function fetchNews(
  organization?: string, 
  limit: number = 20, 
  page: number = 1
): Promise<ApiResponse<NewsItem[]>> {
  const params = new URLSearchParams();
  if (organization && organization !== 'all') {
    params.append('organization', organization);
  }
  params.append('limit', limit.toString());
  params.append('page', page.toString());
  
  const queryString = params.toString();
  const endpoint = `/news${queryString ? `?${queryString}` : ''}`;
  
  return await fetchApi<NewsItem[]>(endpoint);
}

export async function fetchAllNews(): Promise<ApiResponse<NewsItem[]>> {
  return await fetchApi<NewsItem[]>('/news?limit=1000');
}

export async function fetchOrganizations(): Promise<ApiResponse<Organization[]>> {
  return await fetchApi<Organization[]>('/organizations');
}

export async function fetchStatistics(): Promise<ApiResponse<Statistics>> {
  return await fetchApi<Statistics>('/statistics');
}
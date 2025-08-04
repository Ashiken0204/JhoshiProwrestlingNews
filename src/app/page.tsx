'use client';

import { useState, useEffect } from 'react';
import { NewsItem, Organization, Statistics } from '@/types/news';
import { fetchNews, fetchOrganizations, fetchStatistics } from '@/lib/api';
import Header from '@/components/Header';
import OrganizationFilter from '@/components/OrganizationFilter';
import NewsCard from '@/components/NewsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [statistics, setStatistics] = useState<Statistics | undefined>();
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [newsResponse, orgsResponse, statsResponse] = await Promise.all([
        fetchNews(selectedOrg, 20),
        fetchOrganizations(),
        fetchStatistics(),
      ]);

      setNews(newsResponse.data);
      setOrganizations(orgsResponse.data);
      setStatistics(statsResponse.data);
    } catch (err) {
      console.error('データ取得エラー:', err);
      setError('ニュースデータの取得に失敗しました。しばらく後でお試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationChange = async (org: string) => {
    setSelectedOrg(org);
    try {
      setLoading(true);
      const newsData = await NewsAPI.getNews(org, 20);
      setNews(newsData);
    } catch (err) {
      console.error('フィルタリングエラー:', err);
      setError('ニュースのフィルタリングに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gray-50">
      <Header statistics={statistics} />
      
      <main className="container mx-auto px-4 py-8">
        {/* フィルター */}
        <OrganizationFilter
          organizations={organizations}
          selectedOrg={selectedOrg}
          onSelectOrg={handleOrganizationChange}
        />

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-700">{error}</p>
              <button
                onClick={fetchData}
                className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                再試行
              </button>
            </div>
          </div>
        )}

        {/* ローディング */}
        {loading && <LoadingSpinner />}

        {/* ニュース一覧 */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {news.length > 0 ? (
              news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">
                  <div className="text-6xl mb-4">📰</div>
                  <p className="text-lg">ニュースが見つかりませんでした</p>
                  <p className="text-sm mt-2">別の団体を選択するか、しばらく後でお試しください</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © 2025 女子プロレスニュース - 最新の女子プロレス情報をお届けします
          </p>
        </div>
      </footer>
    </div>
  );
}
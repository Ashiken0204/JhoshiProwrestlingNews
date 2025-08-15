'use client';

import { useState, useEffect } from 'react';
import { NewsItem, Organization, Statistics } from '@/types/news';
import { fetchNews, fetchAllNews, fetchOrganizations, fetchStatistics } from '@/lib/api';
import Header from '@/components/Header';
import OrganizationFilter from '@/components/OrganizationFilter';
import NewsCard from '@/components/NewsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [statistics, setStatistics] = useState<Statistics | undefined>();
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 現在のページのニュースを計算
  const getCurrentPageNews = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allNews.slice(startIndex, endIndex);
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(allNews.length / ITEMS_PER_PAGE);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [orgsResponse, statsResponse] = await Promise.all([
        fetchOrganizations(),
        fetchStatistics(),
      ]);

      setOrganizations(orgsResponse.data);
      setStatistics(statsResponse.data);
    } catch (err) {
      console.error('データ取得エラー:', err);
      setError('データの取得に失敗しました。しばらく後でお試しください。');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      setError(null);

      let newsResponse;
      if (selectedOrg === 'all') {
        // 全団体の場合は全件取得
        newsResponse = await fetchAllNews();
      } else {
        // 特定団体の場合はページング付きで取得
        newsResponse = await fetchNews(selectedOrg, ITEMS_PER_PAGE, 1);
      }

      setAllNews(newsResponse.data);
    } catch (err) {
      console.error('ニュース取得エラー:', err);
      setError('ニュースの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationChange = async (org: string) => {
    setSelectedOrg(org);
    setCurrentPage(1); // 団体変更時は1ページ目に戻る
    
    try {
      setLoading(true);
      setError(null);

      let newsResponse;
      if (org === 'all') {
        // 全団体の場合は全件取得
        newsResponse = await fetchAllNews();
      } else {
        // 特定団体の場合はページング付きで取得
        newsResponse = await fetchNews(org, ITEMS_PER_PAGE, 1);
      }

      setAllNews(newsResponse.data);
    } catch (err) {
      console.error('ニュース取得エラー:', err);
      setError('ニュースの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    
    if (selectedOrg === 'all') {
      // 全団体の場合はクライアントサイドでページング（何もしない）
      return;
    } else {
      // 特定団体の場合はサーバーサイドでページング
      try {
        setLoading(true);
        const newsResponse = await fetchNews(selectedOrg, ITEMS_PER_PAGE, page);
        setAllNews(newsResponse.data);
      } catch (err) {
        console.error('ページングエラー:', err);
        setError('ページの読み込みに失敗しました。');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (organizations.length > 0) {
      fetchNewsData();
    }
  }, [organizations]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentNews = selectedOrg === 'all' ? getCurrentPageNews() : allNews;

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
                onClick={fetchNewsData}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentNews.length > 0 ? (
                currentNews.map((item) => (
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

            {/* ページング */}
            {!loading && !error && currentNews.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
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

      {/* フローティングボタン */}
      <ScrollToTopButton />
    </div>
  );
}
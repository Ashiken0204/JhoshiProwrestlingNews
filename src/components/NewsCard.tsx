'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NewsItem } from '@/types/news';
import { Calendar, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

const organizationColors: Record<string, string> = {
  stardom: 'bg-purple-500',
  tjpw: 'bg-pink-500',
  wave: 'bg-blue-500',
  ice_ribbon: 'bg-cyan-500',
  chocopro: 'bg-red-500',
  sendaigirls: 'bg-green-500',
  diana: 'bg-indigo-500',
  oz_academy: 'bg-yellow-500',
  seadlinnng: 'bg-teal-500',
  marigold: 'bg-orange-500',
  marvelous: 'bg-emerald-500',
  purej: 'bg-rose-500',
  gokigenpro: 'bg-violet-500',
  jto: 'bg-sky-500',
  evolution: 'bg-fuchsia-500',
};

const organizationNames: Record<string, string> = {
  stardom: 'スターダム',
  tjpw: '東京女子プロレス',
  wave: 'プロレスリングWAVE',
  ice_ribbon: 'アイスリボン',
  chocopro: 'チョコプロ',
  sendaigirls: '仙女',
  diana: 'ディアナ',
  oz_academy: 'OZアカデミー',
  seadlinnng: 'SEAdLINNNG',
  marigold: 'マリーゴールド',
  marvelous: 'マーベラス',
  purej: 'PURE-J',
  gokigenpro: 'ゴキゲンプロレス',
  jto: 'JUST TAP OUT',
  evolution: 'Evolution女子',
};

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  // デフォルト画像をランダムに選択
  const getRandomDefaultThumbnail = () => {
    const defaultImages = [
      '/images/default-thumbnail1.jpg',
      '/images/default-thumbnail2.jpg',
      '/images/default-thumbnail3.jpg',
      '/images/default-thumbnail4.jpg'
    ];
    const randomIndex = Math.floor(Math.random() * defaultImages.length);
    return defaultImages[randomIndex];
  };

  const orgColor = organizationColors[news.organization] || 'bg-gray-500';
  const orgName = organizationNames[news.organization] || news.organization;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* サムネイル画像部分 */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={news.thumbnail || getRandomDefaultThumbnail()}
          alt={news.title}
          fill
          className="object-cover"
          unoptimized // 外部画像のため
        />
        
        {/* 団体タグ - 画像の上に配置 */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${orgColor}`}>
            {orgName}
          </span>
        </div>
      </div>

      {/* コンテンツ部分 */}
      <div className="p-4">
        {/* 日付 */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(news.publishedAt)}
        </div>

        {/* タイトル */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug">
          {news.title}
        </h3>

        {/* 概要（もしあれば） */}
        {news.summary && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {news.summary}
          </p>
        )}

        {/* 詳細リンクボタン */}
        <Link
          href={news.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 hover:shadow-md"
        >
          詳細を見る
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
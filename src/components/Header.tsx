'use client';

import { Sparkles, BarChart3 } from 'lucide-react';
import { Statistics } from '@/types/news';

interface HeaderProps {
  statistics?: Statistics;
}

export default function Header({ statistics }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">女子プロレスニュース</h1>
              <p className="text-sm opacity-90">最新の女子プロレス情報をお届け</p>
            </div>
          </div>
          
          {/* 統計情報 */}
          {statistics && (
            <div className="hidden md:flex items-center space-x-4 bg-white bg-opacity-90 rounded-lg px-4 py-2 text-gray-900">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div className="text-sm">
                <div className="font-semibold text-gray-900">総記事数: {statistics.total}件</div>
                <div className="text-gray-700">
                  最終更新: {new Date(statistics.latestUpdate).toLocaleDateString('ja-JP')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
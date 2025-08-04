'use client';

import { Organization } from '@/types/news';

interface OrganizationFilterProps {
  organizations: Organization[];
  selectedOrg: string;
  onSelectOrg: (org: string) => void;
}

export default function OrganizationFilter({ 
  organizations, 
  selectedOrg, 
  onSelectOrg 
}: OrganizationFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {/* 全て表示ボタン */}
        <button
          onClick={() => onSelectOrg('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedOrg === 'all'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          すべて
        </button>

        {/* 各団体ボタン */}
        {organizations.map((org) => (
          <button
            key={org.name}
            onClick={() => onSelectOrg(org.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedOrg === org.name
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {org.displayName}
          </button>
        ))}
      </div>
    </div>
  );
}
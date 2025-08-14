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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label htmlFor="organization-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          団体選択:
        </label>
        <select
          id="organization-select"
          value={selectedOrg}
          onChange={(e) => onSelectOrg(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900"
        >
          <option value="all">すべての団体</option>
          {organizations.map((org) => (
            <option key={org.name} value={org.name}>
              {org.displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
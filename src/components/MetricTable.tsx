import React from 'react';
import { ChevronUp, ChevronDown, TrendingUp, Eye, MousePointer, Target } from 'lucide-react';
import type { SearchQuery, SortField, TableSort } from '../types/analytics';

interface MetricTableProps {
  data: SearchQuery[];
  onRowClick: (query: SearchQuery) => void;
  selectedQuery?: SearchQuery;
  sort: TableSort;
  onSort: (field: SortField) => void;
  className?: string;
}

export const MetricTable: React.FC<MetricTableProps> = ({
  data,
  onRowClick,
  selectedQuery,
  sort,
  onSort,
  className = '',
}) => {
  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sort.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatCTR = (ctr: number) => {
    return `${ctr.toFixed(1)}%`;
  };

  const formatPosition = (position: number) => {
    return position.toFixed(1);
  };

  const getMetricIcon = (field: SortField) => {
    switch (field) {
      case 'clicks':
        return <MousePointer className="w-4 h-4" />;
      case 'impressions':
        return <Eye className="w-4 h-4" />;
      case 'ctr':
        return <TrendingUp className="w-4 h-4" />;
      case 'position':
        return <Target className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`table-container ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="table-header">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Query
              </th>
              {(['clicks', 'impressions', 'ctr', 'position'] as const).map((field) => (
                <th
                  key={field}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onSort(field)}
                >
                  <div className="flex items-center space-x-2">
                    {getMetricIcon(field)}
                    <span>{field.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                    {getSortIcon(field)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((query, index) => (
              <tr
                key={`${query.query}-${index}`}
                onClick={() => onRowClick(query)}
                className={`table-row cursor-pointer transition-colors ${
                  selectedQuery?.query === query.query ? 'selected' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                    {query.query}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-green-600">
                      {formatNumber(query.clicks)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-medium text-blue-600">
                    {formatNumber(query.impressions)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`font-medium ${
                    query.ctr > 10 ? 'text-green-600' : 
                    query.ctr > 5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formatCTR(query.ctr)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`font-medium ${
                    query.position <= 2 ? 'text-green-600' : 
                    query.position <= 5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formatPosition(query.position)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
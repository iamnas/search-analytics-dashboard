
import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Filter } from 'lucide-react';
import { useDateRange } from '../hooks/useDateRange';
import { useSearchAnalytics } from '../hooks/useSearchAnalytics';
import { DateRangePicker } from '../components/DateRangePicker';
import { QueryFilter } from '../components/QueryFilter';
import { MetricTable } from '../components/MetricTable';
import { DetailChart } from '../components/DetailChart';
import { LoadingSpinner } from '../components/LoadingSpinner';
import type{ SearchQuery, SortField, TableSort } from '../types/analytics';
import { useDebounce } from '../hooks/useDebounce';

export const Dashboard: React.FC = () => {
  const { dateRange, updateDateRange } = useDateRange();
  const [queryFilter, setQueryFilter] = useState('');
  const debouncedQuery = useDebounce(queryFilter, 300);

  const [selectedQuery, setSelectedQuery] = useState<SearchQuery | null>(null);
  const [sort, setSort] = useState<TableSort>({ field: 'clicks', direction: 'desc' });

  const { data, loading, error } = useSearchAnalytics(
  dateRange.startDate,
  dateRange.endDate,
  debouncedQuery || undefined
);

  // Sort and filter data
  const processedData = useMemo(() => {
    if (!data?.topQueries) return [];

    let filtered = data.topQueries;

    // Apply text filter
    if (queryFilter) {
      filtered = filtered.filter(query => 
        query.query.toLowerCase().includes(queryFilter.toLowerCase())
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      if (typeof aValue === 'string') {
        return sort.direction === 'asc' 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }
      
      return sort.direction === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return sorted;
  }, [data?.topQueries, queryFilter, sort]);

  const handleSort = (field: SortField) => {
    setSort(prevSort => ({
      field,
      direction: prevSort.field === field && prevSort.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleRowClick = (query: SearchQuery) => {
    setSelectedQuery(query);
  };

  const handleCloseChart = () => {
    setSelectedQuery(null);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="error-container">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 text-red-600">
              <BarChart3 className="w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to load data
            </h3>
            <p className="text-gray-600">
              {error.message || 'An error occurred while fetching analytics data.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container py-6">
          <div className="flex items-center space-x-3">
            <div className="icon-container bg-blue-100">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Search Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor and analyze your search performance metrics
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Controls */}
        <div className="metric-card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onDateChange={updateDateRange}
            />
            
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <QueryFilter
                value={queryFilter}
                onChange={setQueryFilter}
                className="w-64"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Metrics Overview */}
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <div className="icon-container bg-green-100">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Queries</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {processedData.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <div className="icon-container bg-blue-100">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat().format(
                        processedData.reduce((sum, q) => sum + q.clicks, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <div className="icon-container bg-purple-100">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Impressions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat().format(
                        processedData.reduce((sum, q) => sum + q.impressions, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="flex items-center space-x-3">
                  <div className="icon-container bg-yellow-100">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg CTR</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {processedData.length > 0 
                        ? (processedData.reduce((sum, q) => sum + q.ctr, 0) / processedData.length).toFixed(1)
                        : '0.0'}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Table */}
          {loading ? (
            <div className="metric-card p-12">
              <LoadingSpinner size="lg" className="py-8" />
              <p className="text-center text-gray-600 mt-4">Loading analytics data...</p>
            </div>
          ) : (
            <MetricTable
              data={processedData}
              onRowClick={handleRowClick}
              selectedQuery={selectedQuery ?? undefined}
              sort={sort}
              onSort={handleSort}
            />
          )}

          {/* Detail Chart */}
          {selectedQuery && data?.timeSeries && (
            <DetailChart
              data={data.timeSeries}
              queryName={selectedQuery.query}
              onClose={handleCloseChart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import { useQuery } from '@apollo/client';
import { GET_SEARCH_ANALYTICS } from '../graphql/queries';
import type { SearchAnalyticsData, SearchAnalyticsVariables } from '../types/analytics';
import { formatDateForAPI } from '../utils/dateUtils';

export const useSearchAnalytics = (
  startDate: Date,
  endDate: Date,
  queryFilter?: string
) => {
  const variables: SearchAnalyticsVariables = {
    startDate: formatDateForAPI(startDate),
    endDate: formatDateForAPI(endDate),
    queryFilter,
  };

  const { data, loading, error, refetch } = useQuery<
    { searchAnalytics: SearchAnalyticsData },
    SearchAnalyticsVariables
  >(GET_SEARCH_ANALYTICS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.searchAnalytics,
    loading,
    error,
    refetch: () => refetch(variables),
  };
};
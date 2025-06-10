import { gql } from '@apollo/client';

export const GET_SEARCH_ANALYTICS = gql`
  query GetSearchAnalytics($startDate: String!, $endDate: String!, $queryFilter: String) {
    searchAnalytics(startDate: $startDate, endDate: $endDate, filter: $queryFilter) {
      topQueries(limit: 20, sortBy: CLICKS_DESC) {
        query
        clicks
        impressions
        ctr
        position
      }
      timeSeries(query: $queryFilter, dimensions: ["date"]) {
        date
        clicks
        impressions
      }
    }
  }
`;
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { Observable } from 'zen-observable-ts';
import { mockData } from '../mocks/mockData';

// Mock link that returns our mock data instead of making real HTTP requests
const mockLink = new ApolloLink(() => {
  return new Observable(observer => {
    setTimeout(() => {
      observer.next({
        data: {
          searchAnalytics: mockData,
        },
      });
      observer.complete();
    }, 500); // Simulate network delay
  });
});

export const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
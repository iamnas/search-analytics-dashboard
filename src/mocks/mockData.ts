import type { SearchAnalyticsData } from '../types/analytics';
import { subDays, format } from 'date-fns';

// Generate mock time series data for the last 30 days
const generateTimeSeries = (baseClicks: number, baseImpressions: number) => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const variation = Math.random() * 0.4 - 0.2; // ±20% variation
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      clicks: Math.round(baseClicks * (1 + variation)),
      impressions: Math.round(baseImpressions * (1 + variation)),
    });
  }
  return data;
};

export const mockData: SearchAnalyticsData = {
  topQueries: [
    {
      query: 'react typescript tutorial',
      clicks: 12500,
      impressions: 85000,
      ctr: 14.7,
      position: 2.3,
    },
    {
      query: 'javascript best practices',
      clicks: 9800,
      impressions: 120000,
      ctr: 8.2,
      position: 3.1,
    },
    {
      query: 'web development 2024',
      clicks: 8900,
      impressions: 95000,
      ctr: 9.4,
      position: 2.8,
    },
    {
      query: 'nodejs express api',
      clicks: 7600,
      impressions: 78000,
      ctr: 9.7,
      position: 2.5,
    },
    {
      query: 'css grid flexbox',
      clicks: 6800,
      impressions: 89000,
      ctr: 7.6,
      position: 3.4,
    },
    {
      query: 'react hooks useState',
      clicks: 6200,
      impressions: 67000,
      ctr: 9.3,
      position: 2.7,
    },
    {
      query: 'mongodb vs postgresql',
      clicks: 5900,
      impressions: 45000,
      ctr: 13.1,
      position: 1.9,
    },
    {
      query: 'docker containerization',
      clicks: 5400,
      impressions: 52000,
      ctr: 10.4,
      position: 2.2,
    },
    {
      query: 'graphql vs rest api',
      clicks: 4800,
      impressions: 38000,
      ctr: 12.6,
      position: 2.1,
    },
    {
      query: 'typescript interfaces',
      clicks: 4500,
      impressions: 41000,
      ctr: 11.0,
      position: 2.4,
    },
    {
      query: 'responsive web design',
      clicks: 4200,
      impressions: 68000,
      ctr: 6.2,
      position: 4.1,
    },
    {
      query: 'aws serverless lambda',
      clicks: 3800,
      impressions: 29000,
      ctr: 13.1,
      position: 1.8,
    },
    {
      query: 'unit testing jest',
      clicks: 3500,
      impressions: 35000,
      ctr: 10.0,
      position: 2.6,
    },
    {
      query: 'git workflow branching',
      clicks: 3200,
      impressions: 42000,
      ctr: 7.6,
      position: 3.2,
    },
    {
      query: 'performance optimization',
      clicks: 2900,
      impressions: 38000,
      ctr: 7.6,
      position: 3.3,
    },
    {
      query: 'security vulnerabilities',
      clicks: 2600,
      impressions: 31000,
      ctr: 8.4,
      position: 2.9,
    },
    {
      query: 'microservices architecture',
      clicks: 2400,
      impressions: 26000,
      ctr: 9.2,
      position: 2.7,
    },
    {
      query: 'ci cd pipeline',
      clicks: 2100,
      impressions: 24000,
      ctr: 8.8,
      position: 3.0,
    },
    {
      query: 'kubernetes deployment',
      clicks: 1900,
      impressions: 21000,
      ctr: 9.0,
      position: 2.8,
    },
    {
      query: 'database optimization',
      clicks: 1700,
      impressions: 19000,
      ctr: 8.9,
      position: 2.9,
    },
  ],
  timeSeries: generateTimeSeries(5000, 50000),
};
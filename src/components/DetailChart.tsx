import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { TimeSeriesData } from '../types/analytics';
import { format, parseISO } from 'date-fns';
import { X } from 'lucide-react';
  import type { TooltipProps } from 'recharts';


interface DetailChartProps {
  data: TimeSeriesData[];
  queryName: string;
  onClose: () => void;
  className?: string;
}

export const DetailChart: React.FC<DetailChartProps> = ({
  data,
  queryName,
  onClose,
  className = '',
}) => {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd');
  };

  const formatTooltipDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  };


  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">
            {formatTooltipDate(label)}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color ?? '#000' }}>
              {entry.name}: <span className="font-semibold">
                {entry.value !== undefined ? new Intl.NumberFormat().format(entry.value as number) : '-'}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`metric-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Performance Over Time
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Query: <span className="font-medium">{queryName}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="btn"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#666"
              fontSize={12}
            />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Clicks"
            />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Impressions"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
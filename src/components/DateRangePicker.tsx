import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDisplayDate } from '../utils/dateUtils';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
  className = '',
}) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = new Date(e.target.value);
    onDateChange(newStartDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = new Date(e.target.value);
    onDateChange(startDate, newEndDate);
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Date Range:</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={handleStartDateChange}
          className="form-input"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={handleEndDateChange}
          className="form-input"
        />
      </div>
      
      <div className="text-sm text-gray-600">
        {formatDisplayDate(startDate)} - {formatDisplayDate(endDate)}
      </div>
    </div>
  );
};
import { useState } from 'react';
import { getDefaultDateRange } from '../utils/dateUtils';

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState(() => getDefaultDateRange());

  const updateDateRange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  return {
    dateRange,
    updateDateRange,
  };
};
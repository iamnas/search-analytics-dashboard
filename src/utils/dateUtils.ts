import { format, subDays, startOfDay, endOfDay } from 'date-fns';

export const formatDateForAPI = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getDefaultDateRange = () => {
  const endDate = new Date();
  const startDate = subDays(endDate, 29); // Last 30 days
  
  return {
    startDate: startOfDay(startDate),
    endDate: endOfDay(endDate),
  };
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const parseDateString = (dateString: string): Date => {
  return new Date(dateString);
};
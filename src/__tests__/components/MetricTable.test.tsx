import { render, screen, fireEvent } from '@testing-library/react';
import { MetricTable } from '../../components/MetricTable';
import type { SearchQuery, TableSort } from '../../types/analytics';
import { expect, vi } from 'vitest';

const mockData: SearchQuery[] = [
  {
    query: 'react tutorial',
    clicks: 1000,
    impressions: 10000,
    ctr: 10.0,
    position: 2.5,
  },
  {
    query: 'javascript guide',
    clicks: 800,
    impressions: 12000,
    ctr: 6.7,
    position: 3.2,
  },
];

const mockSort: TableSort = {
  field: 'clicks',
  direction: 'desc',
};

describe('MetricTable', () => {
  const mockOnRowClick = vi.fn();
  const mockOnSort = vi.fn();

  const defaultProps = {
    data: mockData,
    onRowClick: mockOnRowClick,
    sort: mockSort,
    onSort: mockOnSort,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with correct data', () => {
    render(<MetricTable {...defaultProps} />);
    
    expect(screen.getByText('react tutorial')).toBeInTheDocument();
    expect(screen.getByText('javascript guide')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('10.0%')).toBeInTheDocument();
  });

  it('calls onRowClick when row is clicked', () => {
    render(<MetricTable {...defaultProps} />);
    
    fireEvent.click(screen.getByText('react tutorial'));
    
    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('calls onSort when column header is clicked', () => {
    render(<MetricTable {...defaultProps} />);
    
    fireEvent.click(screen.getByText('impressions'));
    
    expect(mockOnSort).toHaveBeenCalledWith('impressions');
  });

  it('highlights selected row', () => {
    render(
      <MetricTable 
        {...defaultProps} 
        selectedQuery={mockData[0]} 
      />
    );
    
    const firstRow = screen.getByText('react tutorial').closest('tr');
    expect(firstRow).toHaveClass('bg-blue-50');
  });

  it('formats numbers correctly', () => {
    render(<MetricTable {...defaultProps} />);
    
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
  });

  it('applies correct color coding for CTR', () => {
    render(<MetricTable {...defaultProps} />);
    
    const highCTR = screen.getByText('10.0%');
    const lowCTR = screen.getByText('6.7%');
    
    expect(highCTR).toHaveClass('text-green-600');
    expect(lowCTR).toHaveClass('text-yellow-600');
  });
});
import React from 'react';
// import { Search, X } from 'lucide-react';

interface QueryFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const QueryFilter: React.FC<QueryFilterProps> = ({
  value,
  onChange,
  placeholder = 'Filter queries...',
  className = '',
}) => {
  // const handleClear = () => {
  //   onChange('');
  // };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {/* <Search className="h-5 w-5 text-gray-400" /> */}
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
     
      
      {/* {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 transition-colors"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )} */}
    </div>
  );
};
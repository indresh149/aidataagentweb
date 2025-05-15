import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps {
  columns: string[];
  rows: any[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  // Function to handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted data
  const getSortedData = (data: any[]) => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] === null) return 1;
      if (b[sortConfig.key] === null) return -1;
      if (a[sortConfig.key] === b[sortConfig.key]) return 0;
      
      // Check if values are numbers
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return sortConfig.direction === 'ascending'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
      
      // String comparison
      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  };

  const sortedRows = getSortedData(rows);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => requestSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column}</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              {columns.map((column, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                >
                  {row[column] !== undefined ? String(row[column]) : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { EmptyState } from './EmptyState';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  renderMobileCard?: (row: T, index: number) => React.ReactNode;
  keyExtractor: (row: T) => string;
  itemsPerPage?: number;
  extraFilters?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  onSearchChange,
  renderMobileCard,
  keyExtractor,
  itemsPerPage = 8,
  extraFilters,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    setCurrentPage(1);
    if (onSearchChange) onSearchChange(q);
  };

  // Basic local search filtering if onSearchChange is not custom-handled
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return Object.values(item as Record<string, unknown>).some((val) =>
      String(val || '').toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Search & Filter Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-fintech-card">
        <div className="w-full sm:w-80">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearch}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
        {extraFilters && <div className="flex items-center gap-2 flex-wrap">{extraFilters}</div>}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-fintech overflow-hidden">
        {paginatedData.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-semibold text-slate-500 tracking-wider">
                <tr>
                  {columns.map((col, i) => (
                    <th key={i} className="px-5 py-3.5">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map((row) => (
                  <tr key={keyExtractor(row)} className="hover:bg-slate-50/80 transition-colors">
                    {columns.map((col, i) => (
                      <td key={i} className="px-5 py-4 whitespace-nowrap">
                        {col.cell ? col.cell(row) : (row[col.accessorKey!] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Card List View */}
      <div className="block md:hidden space-y-3">
        {paginatedData.length === 0 ? (
          <EmptyState />
        ) : (
          paginatedData.map((row, idx) =>
            renderMobileCard ? (
              <React.Fragment key={keyExtractor(row)}>{renderMobileCard(row, idx)}</React.Fragment>
            ) : (
              <div key={keyExtractor(row)} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                {columns.map((col, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500">{col.header}:</span>
                    <span className="font-medium text-slate-900">
                      {col.cell ? col.cell(row) : (row[col.accessorKey!] as React.ReactNode)}
                    </span>
                  </div>
                ))}
              </div>
            )
          )
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 text-xs text-slate-600">
          <p>
            Showing <span className="font-semibold">{Math.min(filteredData.length, (currentPage - 1) * itemsPerPage + 1)}</span> to{' '}
            <span className="font-semibold">{Math.min(filteredData.length, currentPage * itemsPerPage)}</span> of{' '}
            <span className="font-semibold">{filteredData.length}</span> results
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-semibold text-slate-800">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

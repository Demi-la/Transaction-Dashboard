'use client'
import {
  flexRender,
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn,
} from "@tanstack/react-table";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";

export interface TableData {
  id: number;
  senderName: string;
  receiverName: string;
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  timestamp: string;
}

interface TableProps {
  columns: ColumnDef<TableData>[];
  data: TableData[];
  onSortingChange?: OnChangeFn<SortingState>;
  searchQuery?: string;
}

const CustomTable: React.FC<TableProps> = ({
  data,
  columns,
  onSortingChange,
  searchQuery = "",
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState(searchQuery);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
      setFiltering(searchQuery);
    }, [searchQuery]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter:  filtering,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: (updater) => {
      setSorting((prevSorting) => {
        const newSorting =
          typeof updater === "function" ? updater(prevSorting) : updater;
        onSortingChange?.(newSorting);
        return newSorting;
      });
    },
    onGlobalFilterChange: setFiltering,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    enableSorting: true,
    // manualPagination: true,
  });

  return (
    <div>
      <table className="w-full mx-auto">
        <thead className="bg-[#2d416f] text-white text-sm font-medium h-16">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() && (
                    <span>
                      {header.column.getIsSorted() === "desc" ? (
                        <MdArrowForwardIos />
                      ) : (
                        <MdArrowBackIos />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="text-[0.8rem] font-normal text-[#2d416f] text-center">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="leading-[2rem]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination  */}
      <div className="flex items-center justify-between mt-4">
        <p>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-6">
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            <MdArrowBackIos />
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;

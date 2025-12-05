import React from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "./pagination";

function TableComponent({
    columns,
    data,
    onRowClick,
    emptyMessage = "No data available",
    pagination,
    onPageChange,
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-primary/50">
                <Table className="overflow-x-auto bg-primary/5">
                    <TableHeader className="bg-primary/10">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    className="text-primary text-lg"
                                    key={column.key}
                                >
                                    {column.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row, rowIndex) => (
                                <TableRow
                                    key={row.id || rowIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={
                                        onRowClick
                                            ? "cursor-pointer hover:bg-primary/10"
                                            : ""
                                    }
                                >
                                    {columns.map((column) => (
                                        <TableCell key={column.key}>
                                            {column.render
                                                ? column.render(
                                                      row[column.key],
                                                      row
                                                  )
                                                : row[column.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && onPageChange && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}

TableComponent.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
    emptyMessage: PropTypes.string,
    pagination: PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        totalItems: PropTypes.number,
        itemsPerPage: PropTypes.number,
    }),
    onPageChange: PropTypes.func,
};

export default TableComponent;

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { TableComponent, Pagination } from "../../../components";
import { Disc3, TrendingUp, Crown, BarChart3 } from "lucide-react";

const ITEMS_PER_PAGE = 10;

function ArtistStatsTable({ artistStats, formatSales }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = artistStats?.length || 0;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const paginatedData = useMemo(() => {
        if (!artistStats) return [];
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return artistStats.slice(startIndex, endIndex);
    }, [artistStats, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            key: "rank",
            label: "#",
            render: (value, row) => {
                const index = artistStats?.findIndex((a) => a.id === row.id);

                return (
                    <span className="text-muted-foreground font-medium">
                        {index + 1}
                    </span>
                );
            },
        },
        {
            key: "name",
            label: "Artist",
            render: (value, row) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                        {row.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {row.code}
                    </span>
                </div>
            ),
        },
        {
            key: "total_albums",
            label: "Albums",
            render: (value, row) => (
                <div className="flex items-center gap-2">
                    <Disc3 className="w-4 h-4 text-primary/70" />
                    <span>{row.total_albums || 0}</span>
                </div>
            ),
        },
        {
            key: "total_sales",
            label: "Total Sales",
            render: (value, row) => (
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary/70" />
                    <span className="font-medium text-primary">
                        {formatSales(row.total_sales)}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                    Albums & Sales Per Artist
                </h2>
            </div>
            <div className="rounded-xl border border-primary/20 overflow-hidden flex-1">
                <TableComponent
                    columns={columns}
                    data={paginatedData}
                    emptyMessage="No artist data available"
                />
            </div>
            {totalPages > 1 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}

ArtistStatsTable.propTypes = {
    artistStats: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            code: PropTypes.string,
            total_albums: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            total_sales: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
        })
    ),
    formatSales: PropTypes.func.isRequired,
};

export default ArtistStatsTable;

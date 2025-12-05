import { useState, useCallback, useMemo } from "react";
import { router } from "@inertiajs/react";
import { useDebounce } from "./useDebounce";

/**
 * useQueryParams - Hook for managing URL query parameters with search, sort, and pagination
 * @param {string} baseUrl - The base URL to navigate to
 * @param {object} options - Configuration options
 * @param {string} options.defaultSortOrder - Default sort order (default: "asc")
 * @param {number} options.debounceDelay - Debounce delay in ms (default: 500)
 */
export function useQueryParams(baseUrl, options = {}) {
    const { defaultSortOrder = "asc", debounceDelay = 500 } = options;

    // Get initial values from URL query params
    const urlParams = useMemo(
        () => new URLSearchParams(window.location.search),
        []
    );

    const [search, setSearch] = useState(urlParams.get("search") || "");
    const [sortBy, setSortBy] = useState(urlParams.get("sort_by") || "name");
    const [sortOrder, setSortOrder] = useState(
        urlParams.get("sort_order") || defaultSortOrder
    );

    const debouncedSearch = useDebounce(search, debounceDelay);

    // Build params helper
    const buildParams = useCallback(
        (overrides = {}) => {
            const params = {};
            const currentSearch = overrides.search ?? debouncedSearch;
            const currentSortBy = overrides.sort_by ?? sortBy;
            const currentSortOrder = overrides.sort_order ?? sortOrder;

            if (currentSearch) params.search = currentSearch;
            if (currentSortBy) params.sort_by = currentSortBy;
            if (currentSortOrder) params.sort_order = currentSortOrder;

            return params;
        },
        [debouncedSearch, sortBy, sortOrder]
    );

    // Navigate with current params
    const navigate = useCallback(
        (overrides = {}, options = {}) => {
            const params = buildParams(overrides);
            router.get(baseUrl, params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                ...options,
            });
        },
        [baseUrl, buildParams]
    );

    // Handle search change
    const handleSearch = useCallback((e) => {
        const value = typeof e === "string" ? e : e.target.value;
        setSearch(value);
    }, []);

    // Handle sort toggle
    const handleSort = useCallback(
        (column) => {
            let newOrder = "asc";
            if (sortBy === column) {
                newOrder = sortOrder === "asc" ? "desc" : "asc";
            }

            setSortBy(column);
            setSortOrder(newOrder);

            router.get(
                baseUrl,
                buildParams({ sort_by: column, sort_order: newOrder }),
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        },
        [baseUrl, buildParams, sortBy, sortOrder]
    );

    // Handle page change
    const handlePageChange = useCallback(
        (page) => {
            const params = { ...buildParams(), page };
            router.get(baseUrl, params, {
                preserveState: true,
                preserveScroll: true,
            });
        },
        [baseUrl, buildParams]
    );

    return {
        // State
        search,
        sortOrder,
        debouncedSearch,

        // Setters
        setSearch,
        setSortBy,
        setSortOrder,

        // Handlers
        handleSearch,
        handleSort,
        handlePageChange,

        // Helpers
        buildParams,
        navigate,
    };
}

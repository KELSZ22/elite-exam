import { useState, useCallback, useMemo } from "react";
import { router } from "@inertiajs/react";
import { useDebounce } from "./useDebounce";

export function useQueryParams(baseUrl, options = {}) {
    const { defaultSortOrder = "asc", debounceDelay = 500 } = options;

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

    const handleSearch = useCallback((e) => {
        const value = typeof e === "string" ? e : e.target.value;
        setSearch(value);
    }, []);

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
        search,
        sortOrder,
        debouncedSearch,
        setSearch,
        setSortBy,
        setSortOrder,
        handleSearch,
        handleSort,
        handlePageChange,
        buildParams,
        navigate,
    };
}

import React, { useState, useEffect } from "react";
import {
    TableComponent,
    ActionDropdown,
    SearchInput,
} from "../../../components";
import { ArrowUpDown, Eye, Pencil, Plus, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePage, router } from "@inertiajs/react";
import { useQueryParams } from "../../../hooks";
import CreateArtist from "./create-artist";

function Artists() {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const { artists } = usePage().props;

    const {
        search,
        debouncedSearch,
        handleSearch,
        handleSort,
        handlePageChange,
        buildParams,
    } = useQueryParams("/artists");

    useEffect(() => {
        router.get("/artists", buildParams(), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [debouncedSearch]);

    const handleView = (row) => {
        console.log("View:", row);
    };

    const handleEdit = (row) => {
        console.log("Edit:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete:", row);
    };

    const actions = [
        { label: "View", onClick: handleView, icon: Eye },
        { label: "Edit", onClick: handleEdit, icon: Pencil },
        {
            label: "Delete",
            onClick: handleDelete,
            icon: Trash,
            variant: "destructive",
            separator: true,
        },
    ];

    const columns = [
        {
            key: "avatar",
            label: "",
            render: (_, row) => (
                <Avatar className="w-10 h-10">
                    <AvatarImage
                        src={
                            row.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                row.name || ""
                            )}&background=87af49&color=fff&size=128`
                        }
                        alt={row.name}
                    />
                    <AvatarFallback>
                        {row.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        { key: "code", label: "CODE" },
        { key: "name", label: "NAME" },
        {
            key: "albums_count",
            label: "ALBUMS",
            render: (value) => value || 0,
        },
        {
            key: "actions",
            label: "ACTIONS",
            render: (_, row) => <ActionDropdown actions={actions} row={row} />,
        },
    ];

    const tableData = artists?.data || [];

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-5xl font-bold text-primary">Artists</h1>

                    <Button
                        variant="default"
                        onClick={() => setIsFormModalOpen(true)}
                    >
                        <Plus /> Add Artist
                    </Button>
                </div>
                <div className="flex items-center gap-2 w-full">
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search artists..."
                    />
                    <Button
                        variant="outline"
                        onClick={() => handleSort("name")}
                        className="w-10 h-10 border-primary/50 hover:bg-primary/10"
                    >
                        <ArrowUpDown className="size-4 text-primary" />
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <TableComponent
                    columns={columns}
                    data={tableData}
                    pagination={
                        artists && {
                            currentPage: artists.current_page,
                            totalPages: artists.last_page,
                            totalItems: artists.total,
                            itemsPerPage: artists.per_page,
                        }
                    }
                    onPageChange={handlePageChange}
                />
            </div>

            <CreateArtist
                open={isFormModalOpen}
                onOpenChange={setIsFormModalOpen}
            />
        </div>
    );
}

export default Artists;

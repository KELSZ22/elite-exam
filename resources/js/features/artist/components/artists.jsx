import React, { useState, useEffect } from "react";
import {
    TableComponent,
    ConfirmModal,
    SearchInput,
    PageHeader,
} from "../../../components";
import { ArrowUpDown, Users, Plus, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePage, router, Head } from "@inertiajs/react";
import { useQueryParams } from "../../../hooks";
import CreateArtist from "./create-artist";
import UpdateArtist from "./update-artist";
import ViewArtist from "./view-artist";
import { getArtistActions, getArtistColumns } from "./artist-table-config";
import { toast } from "sonner";

function Artists() {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedArtistToDelete, setSelectedArtistToDelete] = useState(null);
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
        setSelectedArtist(row);
        setIsViewModalOpen(true);
    };

    const handleEdit = (row) => {
        setSelectedArtist(row);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (row) => {
        setSelectedArtistToDelete(row);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        router.delete(`/artists/${selectedArtistToDelete.id}`, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedArtistToDelete(null);
                toast.success("Artist deleted successfully!");
            },
        });
    };

    const actions = getArtistActions({
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
    });

    const columns = getArtistColumns(actions);

    const tableData = artists?.data || [];

    return (
        <div className="container mx-auto px-4">
            <Head title="Musync - Artists" />
            <PageHeader
                title="Artists"
                subtitle="Manage your artist details."
                icon={Headphones}
            >
                <Button
                    variant="default"
                    onClick={() => setIsFormModalOpen(true)}
                >
                    <Plus /> Add Artist
                </Button>
            </PageHeader>

            <div className="flex items-center gap-2 w-full mb-4">
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
            <UpdateArtist
                open={isUpdateModalOpen}
                onOpenChange={setIsUpdateModalOpen}
                artist={selectedArtist}
            />
            <ConfirmModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
            <ViewArtist
                open={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
                artist={selectedArtist}
                onClose={() => setIsViewModalOpen(false)}
            />
        </div>
    );
}

export default Artists;

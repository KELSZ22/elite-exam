import React, { useState, useEffect } from "react";
import {
    ConfirmModal,
    SearchInput,
    AlbumCard,
    PageHeader,
} from "../../../components";
import {
    ArrowUpDown,
    Plus,
    Disc3,
    Pencil,
    Trash2,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePage, router, Head } from "@inertiajs/react";
import { useQueryParams } from "../../../hooks";
import CreateAlbum from "./create-album";
import UpdateAlbum from "./update-album";
import { toast } from "sonner";

function Albums() {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAlbumToDelete, setSelectedAlbumToDelete] = useState(null);
    const [albumsList, setAlbumsList] = useState([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { albums } = usePage().props;

    const { search, debouncedSearch, handleSearch, handleSort, buildParams } =
        useQueryParams("/albums");

    useEffect(() => {
        if (albums?.data) {
            setAlbumsList(albums.data);
        }
    }, [albums?.data]);

    useEffect(() => {
        router.get("/albums", buildParams(), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onSuccess: () => {},
        });
    }, [debouncedSearch]);

    const handleLoadMore = () => {
        if (!albums?.next_page_url || isLoadingMore) return;

        setIsLoadingMore(true);

        router.get(
            albums.next_page_url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: ["albums"],
                onSuccess: (page) => {
                    const newAlbums = page.props.albums?.data || [];
                    setAlbumsList((prev) => [...prev, ...newAlbums]);
                    setIsLoadingMore(false);
                },
                onError: () => {
                    setIsLoadingMore(false);
                    toast.error("Failed to load more albums");
                },
            }
        );
    };

    const handleEdit = (album) => {
        setSelectedAlbum(album);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (album) => {
        setSelectedAlbumToDelete(album);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        router.delete(`/albums/${selectedAlbumToDelete.id}`, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setAlbumsList((prev) =>
                    prev.filter((a) => a.id !== selectedAlbumToDelete.id)
                );
                setSelectedAlbumToDelete(null);
                toast.success("Album deleted successfully!");
            },
        });
    };

    const actions = [
        { label: "Edit", onClick: handleEdit, icon: Pencil },
        {
            label: "Delete",
            onClick: handleDelete,
            icon: Trash2,
            variant: "destructive",
            separator: true,
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <Head title="Musync - Albums" />
            <PageHeader
                title="Albums"
                subtitle="Manage your album collection."
                icon={Disc3}
            >
                <Button
                    variant="default"
                    onClick={() => setIsFormModalOpen(true)}
                >
                    <Plus /> Add Album
                </Button>
            </PageHeader>

            <div className="flex items-center gap-2 w-full mb-4">
                <SearchInput
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search albums..."
                />
                <Button
                    variant="outline"
                    onClick={() => handleSort("name")}
                    className="w-10 h-10 border-primary/50 hover:bg-primary/10"
                >
                    <ArrowUpDown className="size-4 text-primary" />
                </Button>
            </div>

            <div className="mt-8">
                {albumsList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Disc3 className="w-16 h-16 text-primary/30 mb-4" />
                        <h3 className="text-lg font-medium text-muted-foreground">
                            No albums found
                        </h3>
                        <p className="text-sm text-muted-foreground/70 mt-1">
                            Add your first album to get started.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {albumsList.map((album) => (
                                <AlbumCard
                                    key={album.id}
                                    album={album}
                                    actions={actions}
                                />
                            ))}
                        </div>

                        {albums?.next_page_url && (
                            <div className="flex justify-center mt-8">
                                <Button
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="px-8 border-primary/50 hover:bg-primary/10 hover:border-primary hover:text-primary"
                                >
                                    {isLoadingMore ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Load More"
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <CreateAlbum
                open={isFormModalOpen}
                onOpenChange={setIsFormModalOpen}
            />
            <UpdateAlbum
                open={isUpdateModalOpen}
                onOpenChange={setIsUpdateModalOpen}
                album={selectedAlbum}
            />
            <ConfirmModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}

export default Albums;

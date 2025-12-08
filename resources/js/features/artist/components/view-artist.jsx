import React, { useState } from "react";
import { ViewModal } from "../../../components";
import PropTypes from "prop-types";
import { X, ChevronDown, Disc3, User } from "lucide-react";
import AlbumsTable from "./albums-table";

function ViewArtist({ open, onOpenChange, artist, onClose: _onClose }) {
    const [showAlbums, setShowAlbums] = useState(false);

    const albums = artist?.albums || [];

    return (
        <ViewModal open={open} onOpenChange={onOpenChange} size="md" noPadding>
            <div className="relative overflow-hidden rounded-lg">
                {artist?.image_url ? (
                    <div className="w-full h-64 overflow-hidden">
                        <img
                            src={artist.image_url}
                            alt={artist?.name || "Artist Profile"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-96 bg-gradient-to-br from-primary/30 via-primary/20 to-background flex items-center justify-center">
                        <User className="w-32 h-32 text-primary/50" />
                    </div>
                )}

                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-xl bg-background/50 border border-primary/20 text-white/80 hover:text-white hover:bg-background/60 transition-all duration-200 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/80 via-background/40 to-transparent pointer-events-none" />

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-xl bg-background/40 border-t border-primary/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-xl font-bold text-white/95 drop-shadow-sm">
                                    {artist?.name}
                                </h3>
                                <p className="text-primary/70 text-sm font-medium">
                                    {artist?.code}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowAlbums(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 hover:text-white transition-all duration-200"
                            >
                                <Disc3 className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    View Albums
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`absolute inset-0 backdrop-blur-xl bg-background/95 transition-transform duration-300 ease-out ${
                        showAlbums ? "translate-y-0" : "translate-y-full"
                    }`}
                >
                    <div className="flex items-center gap-3 p-4 border-b border-primary/20">
                        <button
                            onClick={() => setShowAlbums(false)}
                            className="p-2 rounded-full backdrop-blur-md bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 hover:text-white transition-all duration-200"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </button>
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Albums
                            </h3>
                            <p className="text-primary/70 text-xs">
                                {artist?.name}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 h-[calc(100%-70px)] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-background/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/30 hover:[&::-webkit-scrollbar-thumb]:bg-primary/50">
                        <div className="[&_table]:text-white/90 [&_th]:text-primary/80 [&_td]:text-foreground/70 [&_tr]:border-primary/10">
                            <AlbumsTable
                                data={albums}
                                columns={[
                                    { key: "name", label: "Title" },
                                    { key: "year", label: "Year" },
                                ]}
                                emptyMessage="No albums found for this artist"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ViewModal>
    );
}

export default ViewArtist;

ViewArtist.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    artist: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

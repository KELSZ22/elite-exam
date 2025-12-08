import React from "react";
import { ViewModal } from "../../../components";
import PropTypes from "prop-types";
import { X, Music2, Calendar, TrendingUp, User, Clock, CalendarDays } from "lucide-react";
import { useCurrency } from "../../../hooks";

function ViewAlbum({ open, onOpenChange, album }) {
    const formatCurrency = useCurrency();

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <ViewModal open={open} onOpenChange={onOpenChange} size="md" noPadding>
            <div className="relative overflow-hidden rounded-lg">
                <div className="w-full h-64 bg-gradient-to-br from-primary/30 via-primary/20 to-background flex items-center justify-center">
                    <Music2 className="w-32 h-32 text-primary/50" />
                </div>

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
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <h3 className="text-xl font-bold text-white/95 drop-shadow-sm">
                                    {album?.name}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md bg-primary/10 border border-primary/20">
                                    <User className="w-4 h-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary/70">
                                            Artist
                                        </span>
                                        <span className="text-sm font-medium text-white/90">
                                            {album?.artist?.name || "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md bg-primary/10 border border-primary/20">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary/70">
                                            Year
                                        </span>
                                        <span className="text-sm font-medium text-white/90">
                                            {album?.year || "N/A"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md bg-primary/10 border border-primary/20">
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary/70">
                                            Sales
                                        </span>
                                        <span className="text-sm font-medium text-white/90">
                                            {formatCurrency(album?.sales)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md bg-primary/10 border border-primary/20">
                                    <CalendarDays className="w-4 h-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary/70">
                                            Release Date
                                        </span>
                                        <span className="text-sm font-medium text-white/90">
                                            {formatDate(album?.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-md bg-primary/10 border border-primary/20">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-primary/70">
                                            Last Updated
                                        </span>
                                        <span className="text-sm font-medium text-white/90">
                                            {formatDate(album?.updated_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ViewModal>
    );
}

export default ViewAlbum;

ViewAlbum.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    album: PropTypes.object,
};

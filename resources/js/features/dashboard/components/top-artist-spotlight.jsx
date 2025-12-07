import React from "react";
import PropTypes from "prop-types";
import { Disc3, TrendingUp, Sparkles, Crown } from "lucide-react";
import { getInitials } from "../../../utils/initials";
function TopArtistSpotlight({ artist, formatFullSales }) {
    if (!artist || parseFloat(artist.total_sales) <= 0) {
        return null;
    }

    return (
        <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-foreground">
                    Top Selling Artist
                </h2>
            </div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-background to-primary/5 p-8">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute top-4 right-4">
                    <Sparkles className="w-8 h-8 text-yellow-500/50" />
                </div>
                <div className="relative flex items-center gap-8">
                    <div className="relative">
                        {artist.image_url ? (
                            <img
                                src={artist.image_url}
                                alt={artist.name}
                                className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500/50"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/30 to-primary/30 flex items-center justify-center border-2 border-yellow-500/50">
                                <span className="text-2xl font-bold text-yellow-500">
                                    {getInitials(artist.name)}
                                </span>
                            </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-background rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 border-background">
                            #1
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-yellow-500/80 font-medium uppercase tracking-wider mb-1">
                            Best Performer
                        </p>
                        <h3 className="text-4xl font-bold text-foreground mb-2">
                            {artist.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {artist.code}
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Disc3 className="w-5 h-5 text-primary" />
                                <span className="text-foreground font-medium">
                                    {artist.total_albums} albums
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <span className="text-foreground font-medium">
                                    {formatFullSales(artist.total_sales)} sales
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TopArtistSpotlight.propTypes = {
    artist: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
        image_url: PropTypes.string,
        total_albums: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        total_sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    formatFullSales: PropTypes.func.isRequired,
};

export default TopArtistSpotlight;

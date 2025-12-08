import React from "react";
import PropTypes from "prop-types";
import { Disc3, Calendar, TrendingUp, User, Clock } from "lucide-react";
import ActionDropdown from "./action-dropdown";
import { useCurrency } from "../hooks";

function Card({
    title,
    subtitle,
    icon: IconComponent = Disc3,
    image,
    stats = [],
    actions = [],
    data,
}) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
            <div className="relative h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center overflow-hidden">
                {image ? (
                    <>
                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <IconComponent className="w-32 h-32 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
                    </>
                )}

                <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-300" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-xl" />

                {actions.length > 0 && (
                    <div className="absolute top-3 right-3">
                        <ActionDropdown
                            actions={actions}
                            row={data}
                            triggerClassName="h-8 w-8 backdrop-blur-md bg-background/50 border border-primary/20 hover:bg-background/70 hover:border-primary/40"
                            triggerIcon="vertical"
                        />
                    </div>
                )}
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    {subtitle && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                            <User className="w-3.5 h-3.5 text-primary/70" />
                            <span className="truncate">{subtitle}</span>
                        </div>
                    )}
                </div>

                {stats.length > 0 && (
                    <div className="flex items-center gap-4 pt-2 border-t border-primary/10">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1.5"
                            >
                                {stat.icon && (
                                    <stat.icon className="w-3.5 h-3.5 text-primary/70" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    icon: PropTypes.elementType,
    image: PropTypes.string,
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.elementType,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    actions: PropTypes.array,
    data: PropTypes.object,
};

function AlbumCard({ album, actions = [] }) {
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

    const stats = [
        { icon: Calendar, value: album.year || "N/A" },
        { icon: TrendingUp, value: formatCurrency(album.sales) },
        { icon: Clock, value: formatDate(album.updated_at) },
    ];

    return (
        <Card
            title={album.name}
            subtitle={album.artist?.name || "Unknown Artist"}
            icon={Disc3}
            image={album.image_url}
            stats={stats}
            actions={actions}
            data={album}
        />
    );
}

AlbumCard.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image_url: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sales: PropTypes.number,
        artist: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
    actions: PropTypes.array,
};

export { Card, AlbumCard };

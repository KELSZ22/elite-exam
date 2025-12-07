import React from "react";
import PropTypes from "prop-types";

function StatsCard({ title, value, icon: Icon }) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-300" />
            <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold text-foreground">{value}</p>
                </div>
            </div>
        </div>
    );
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType.isRequired,
};

export default StatsCard;


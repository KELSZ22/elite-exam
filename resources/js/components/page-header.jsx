import React from "react";
import PropTypes from "prop-types";

function PageHeader({ title, subtitle, icon: Icon, children }) {
    return (
        <div className="flex flex-col gap-10 mb-10">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
                                <Icon className="w-8 h-8 text-primary" />
                            </div>
                        )}
                        <div>
                            <h1 className="text-5xl font-bold text-primary">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-primary/70 text-sm">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {children && (
                    <div className="flex items-center gap-2">{children}</div>
                )}
            </div>
        </div>
    );
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    icon: PropTypes.elementType,
    children: PropTypes.node,
};

export default PageHeader;

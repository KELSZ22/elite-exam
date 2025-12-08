import React from "react";
import PropTypes from "prop-types";

function Skeleton({ className = "", width, height, rounded = "md" }) {
    const roundedClass =
        {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        }[rounded] || "rounded-md";

    return (
        <div
            className={`animate-pulse bg-muted ${roundedClass} ${className}`}
            style={{
                width: width || "100%",
                height: height || "1rem",
            }}
        />
    );
}

Skeleton.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "xl", "full"]),
};

function DashboardSkeleton() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col gap-10 mb-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Skeleton width={48} height={48} rounded="xl" />
                        <div className="flex flex-col gap-2">
                            <Skeleton width={200} height={48} />
                            <Skeleton width={300} height={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 p-6"
                    >
                        <div className="flex items-center gap-4">
                            <Skeleton width={48} height={48} rounded="xl" />
                            <div className="flex-1 space-y-2">
                                <Skeleton width={100} height={16} />
                                <Skeleton width={80} height={32} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <Skeleton width={24} height={24} />
                    <Skeleton width={200} height={24} />
                </div>
                <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-background to-primary/5 p-8">
                    <div className="flex items-center gap-8">
                        <Skeleton width={96} height={96} rounded="full" />
                        <div className="flex-1 space-y-4">
                            <Skeleton width={150} height={16} />
                            <Skeleton width={300} height={40} />
                            <Skeleton width={200} height={20} />
                            <div className="flex items-center gap-6">
                                <Skeleton width={100} height={20} />
                                <Skeleton width={120} height={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={250} height={24} />
                    </div>
                    <div className="mb-6">
                        <Skeleton width="100%" height={40} />
                    </div>
                    <div className="rounded-xl border border-primary/20 overflow-hidden flex-1">
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Skeleton
                                        width={32}
                                        height={32}
                                        rounded="lg"
                                    />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton width="60%" height={16} />
                                        <Skeleton width="40%" height={14} />
                                    </div>
                                    <Skeleton width={80} height={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton width={20} height={20} />
                        <Skeleton width={250} height={24} />
                    </div>
                    <div className="rounded-xl border border-primary/20 overflow-hidden flex-1">
                        <div className="p-4 space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Skeleton width={24} height={16} />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton width="70%" height={16} />
                                        <Skeleton width="50%" height={12} />
                                    </div>
                                    <Skeleton width={24} height={16} />
                                    <Skeleton width={100} height={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArtistsSkeleton() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col gap-10 mb-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Skeleton width={48} height={48} rounded="xl" />
                        <div className="flex flex-col gap-2">
                            <Skeleton width={200} height={48} />
                            <Skeleton width={300} height={20} />
                        </div>
                    </div>
                    <Skeleton width={120} height={40} />
                </div>
            </div>

            <div className="flex items-center gap-2 w-full mb-4">
                <Skeleton width="100%" height={40} />
                <Skeleton width={40} height={40} rounded="md" />
            </div>

            <div className="mt-4">
                <div className="rounded-xl border border-primary/20 overflow-hidden">
                    <div className="p-4 space-y-4">
                        <div className="grid grid-cols-5 gap-4 pb-4 border-b border-primary/10">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} width="100%" height={20} />
                            ))}
                        </div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div
                                key={i}
                                className="grid grid-cols-5 gap-4 py-4 border-b border-primary/10 last:border-0"
                            >
                                <Skeleton width="100%" height={20} />
                                <Skeleton width="100%" height={20} />
                                <Skeleton width="100%" height={20} />
                                <Skeleton width="100%" height={20} />
                                <Skeleton width={60} height={32} rounded="md" />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between p-4 border-t border-primary/10">
                        <Skeleton width={200} height={20} />
                        <div className="flex items-center gap-2">
                            <Skeleton width={32} height={32} rounded="md" />
                            <Skeleton width={32} height={32} rounded="md" />
                            <Skeleton width={32} height={32} rounded="md" />
                            <Skeleton width={32} height={32} rounded="md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AlbumsSkeleton() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col gap-10 mb-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Skeleton width={48} height={48} rounded="xl" />
                        <div className="flex flex-col gap-2">
                            <Skeleton width={200} height={48} />
                            <Skeleton width={300} height={20} />
                        </div>
                    </div>
                    <Skeleton width={120} height={40} />
                </div>
            </div>

            <div className="flex items-center gap-2 w-full mb-4">
                <Skeleton width="100%" height={40} />
                <Skeleton width={40} height={40} rounded="md" />
            </div>

            <div className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5"
                        >
                            <Skeleton
                                width="100%"
                                height={160}
                                rounded="none"
                            />
                            <div className="p-4 space-y-3">
                                <Skeleton width="80%" height={24} />
                                <Skeleton width="60%" height={16} />
                                <div className="flex items-center gap-4 pt-2 border-t border-primary/10">
                                    <Skeleton width={60} height={16} />
                                    <Skeleton width={100} height={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export { Skeleton, DashboardSkeleton, ArtistsSkeleton, AlbumsSkeleton };

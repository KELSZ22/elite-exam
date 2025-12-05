import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { AudioLines } from "lucide-react";

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-background border-b border-gray-600 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="shrink-0">
                        <Link
                            href="/"
                            className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <AudioLines className="w-12 h-12 text-primary" />
                                <h1 className="text-2xl font-bold text-primary">
                                    MuSync
                                </h1>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <Link
                            href="/dashboard"
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/artists"
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                            Artists
                        </Link>
                        <Link
                            href="/albums"
                            className="text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                            Albums
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary/80 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                            aria-expanded="false"
                            aria-label="Toggle navigation menu"
                        >
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-gray-600">
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/artists"
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary/80 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Artists
                        </Link>
                        <Link
                            href="/albums"
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary/80 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Albums
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navigation;

import React from "react";
import PropTypes from "prop-types";
import { Navigation } from "./index";
import { Toaster } from "@/components/ui/sonner";

function Layout({ children }) {
    return (
        <div>
            <Navigation />
            <main className="py-12">{children}</main>
            <Toaster position="top-right" richColors />
        </div>
    );
}

export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

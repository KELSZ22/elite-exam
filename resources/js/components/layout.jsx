import React from "react";
import PropTypes from "prop-types";
import { Head } from "@inertiajs/react";
import { Navigation } from "./index";
function Layout({ children }) {
    return (
        <div>
            <Head title="Artists" />
            <Navigation />
            <main className="py-12">{children}</main>
            {/* <Footer /> */}
        </div>
    );
}

export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

import React, { createContext } from "react";
import { usePage, router } from "@inertiajs/react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function useAuth() {
    const { auth } = usePage().props;
    const user = auth?.user || null;
    const isAuthenticated = !!user;

    const login = (credentials) => {
        return router.post("/login", credentials, {
            onError: () => {},
        });
    };

    const logout = () => {
        router.post("/logout");
    };

    return {
        user,
        isAuthenticated,
        login,
        logout,
    };
}

export function RequireAuth({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const isAuthenticated = !!auth?.user;

    if (!isAuthenticated && !url.startsWith("/login")) {
        router.visit("/login");
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
}

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

export function RequireGuest({ children }) {
    const { auth } = usePage().props;
    const isAuthenticated = !!auth?.user;

    if (isAuthenticated) {
        router.visit("/dashboard");
        return null;
    }

    return children;
}

RequireGuest.propTypes = {
    children: PropTypes.node.isRequired,
};

export function AuthProvider({ children }) {
    return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;

import React from "react";
import { Layout } from "../../components";
import { Dashboard } from "../../features/dashboard";
import { RequireAuth } from "../../configs";

function DashboardPage() {
    return (
        <RequireAuth>
            <Layout>
                <Dashboard />
            </Layout>
        </RequireAuth>
    );
}

export default DashboardPage;

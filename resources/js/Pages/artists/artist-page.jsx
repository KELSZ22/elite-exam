import React from "react";
import { Layout } from "../../components";
import { Artists } from "../../features/artist";
import { RequireAuth } from "../../configs";

function ArtistPage() {
    return (
        <RequireAuth>
            <Layout>
                <Artists />
            </Layout>
        </RequireAuth>
    );
}

export default ArtistPage;

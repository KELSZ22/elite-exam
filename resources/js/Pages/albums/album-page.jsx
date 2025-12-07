import React from "react";
import { Layout } from "../../components";
import { Albums } from "../../features/album";
import { RequireAuth } from "../../configs";

function AlbumPage() {
    return (
        <RequireAuth>
            <Layout>
                <Albums />
            </Layout>
        </RequireAuth>
    );
}

export default AlbumPage;

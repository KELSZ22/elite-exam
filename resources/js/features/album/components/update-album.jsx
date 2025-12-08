import React, { useEffect } from "react";
import {
    FormModal,
    InputField,
    SearchSelect,
    ImageUpload,
} from "../../../components";
import PropTypes from "prop-types";
import { useForm, usePage, router } from "@inertiajs/react";
import { useToast } from "../../../hooks";

function UpdateAlbum({ open, onOpenChange, album }) {
    const toast = useToast();
    const { artists } = usePage().props;
    const { data, setData, errors, processing, setError, reset } = useForm({
        artist_id: "",
        name: "",
        year: "",
        sales: "",
        image: null,
    });

    useEffect(() => {
        if (album) {
            setData("artist_id", album.artist_id || "");
            setData("name", album.name || "");
            setData("year", album.year || "");
            setData("sales", album.sales || "");
            setData("image", null);
        } else {
            reset();
        }
    }, [album, setData, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
                _method: "PUT",
                artist_id: data.artist_id,
                name: data.name,
                year: data.year,
            sales: data.sales || "",
        };

        if (data.image instanceof File) {
            formData.image = data.image;
        }

        router.post(`/albums/${album.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                    toast.success("Album updated successfully!");
                },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                if (firstError) {
                    toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
            }
            },
        });
    };

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Update Album"
            description="Update the album"
            onSubmit={handleSubmit}
            submitText="Update"
            cancelText="Cancel"
            isSubmitting={processing}
        >
            <div className="flex flex-col gap-4">
                <ImageUpload
                    key={album?.id || "new"}
                    label="Album Cover"
                    name="image"
                    value={data.image}
                    currentImage={album?.image_url}
                    onChange={(file) => {
                        setData("image", file);
                        setError("image", null);
                    }}
                    error={errors.image}
                />
                <SearchSelect
                    label="Artist"
                    name="artist_id"
                    placeholder="Select an artist..."
                    searchPlaceholder="Search artists..."
                    options={artists || []}
                    value={data.artist_id}
                    onChange={(value) => {
                        setData("artist_id", value);
                        setError("artist_id", null);
                    }}
                    required
                    error={errors.artist_id}
                    valueKey="id"
                    labelKey="name"
                />
                <InputField
                    label="Title"
                    name="name"
                    placeholder="Enter album title"
                    required
                    error={errors.name}
                    value={data.name}
                    onChange={(e) => {
                        setData("name", e.target.value);
                        setError("name", null);
                    }}
                />
                <InputField
                    label="Year"
                    name="year"
                    type="number"
                    placeholder="Enter release year"
                    required
                    error={errors.year}
                    value={data.year}
                    onChange={(e) => {
                        setData("year", e.target.value);
                        setError("year", null);
                    }}
                />
                <InputField
                    label="Sales"
                    name="sales"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter total sales (e.g., 1234.56)"
                    error={errors.sales}
                    value={data.sales}
                    onChange={(e) => {
                        setData("sales", e.target.value);
                        setError("sales", null);
                    }}
                />
            </div>
        </FormModal>
    );
}

export default UpdateAlbum;

UpdateAlbum.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    album: PropTypes.object,
};

import React from "react";
import {
    FormModal,
    InputField,
    SearchSelect,
    ImageUpload,
} from "../../../components";
import PropTypes from "prop-types";
import { useForm, usePage } from "@inertiajs/react";
import { useToast } from "../../../hooks";

function CreateAlbum({ open, onOpenChange }) {
    const toast = useToast();
    const { artists } = usePage().props;
    const { data, setData, errors, post, processing, setError, reset } =
        useForm({
            artist_id: "",
            name: "",
            year: "",
            sales: "",
            image: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/albums", {
            forceFormData: true,
            onSuccess: () => {
                onOpenChange(false);
                reset();
                toast.success("Album created successfully!");
            },
        });
    };

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Create Album"
            description="Create a new album"
            onSubmit={handleSubmit}
            submitText="Create"
            cancelText="Cancel"
            isSubmitting={processing}
        >
            <div className="flex flex-col gap-4">
                <ImageUpload
                    label="Album Cover"
                    name="image"
                    value={data.image}
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

export default CreateAlbum;

CreateAlbum.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
};

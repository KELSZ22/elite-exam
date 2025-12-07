import React from "react";
import { FormModal, InputField, ImageUpload } from "../../../components";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import { useToast } from "../../../hooks";

function CreateArtist({ open, onOpenChange }) {
    const toast = useToast();
    const { data, setData, errors, post, processing, setError, reset } =
        useForm({
            code: "",
            name: "",
            image: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/artists", {
            forceFormData: true,
            onSuccess: () => {
                onOpenChange(false);
                reset();
                toast.success("Artist created successfully!");
            },
        });
    };
    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Create Artist"
            description="Create a new artist"
            onSubmit={handleSubmit}
            submitText="Create"
            cancelText="Cancel"
            isSubmitting={processing}
        >
            <div className="flex flex-col gap-4">
                <ImageUpload
                    label="Artist Image"
                    name="image"
                    value={data.image}
                    onChange={(file) => {
                        setData("image", file);
                        setError("image", null);
                    }}
                    error={errors.image}
                />
                <InputField
                    label="Code"
                    name="code"
                    placeholder="Enter Code"
                    required
                    error={errors.code}
                    value={data.code}
                    onChange={(e) => {
                        setData("code", e.target.value);
                        setError("code", null);
                    }}
                />
                <InputField
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    required
                    error={errors.name}
                    value={data.name}
                    onChange={(e) => {
                        setData("name", e.target.value);
                        setError("name", null);
                    }}
                />
            </div>
        </FormModal>
    );
}

export default CreateArtist;

CreateArtist.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
};

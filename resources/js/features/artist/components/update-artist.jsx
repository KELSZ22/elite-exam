import React, { useEffect } from "react";
import { FormModal, InputField, ImageUpload } from "../../../components";
import PropTypes from "prop-types";
import { useForm, router } from "@inertiajs/react";
import { useToast } from "../../../hooks";

function UpdateArtist({ open, onOpenChange, artist }) {
    const toast = useToast();
    const { data, setData, errors, processing, setError, reset } = useForm({
        code: "",
        name: "",
        image: null,
    });

    useEffect(() => {
        if (artist) {
            setData("code", artist.code);
            setData("name", artist.name);
            setData("image", null);
        }
    }, [artist, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(
            `/artists/${artist.id}`,
            {
                _method: "PUT",
                code: data.code,
                name: data.name,
                image: data.image,
            },
            {
                forceFormData: true,
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                    toast.success("Artist updated successfully!");
                },
            }
        );
    };

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title="Update Artist"
            description="Update the artist"
            onSubmit={handleSubmit}
            submitText="Update"
            cancelText="Cancel"
            isSubmitting={processing}
        >
            <div className="flex flex-col gap-4">
                <ImageUpload
                    label="Artist Image"
                    name="image"
                    value={data.image}
                    currentImage={artist?.image_url}
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

export default UpdateArtist;

UpdateArtist.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    artist: PropTypes.object.isRequired,
};

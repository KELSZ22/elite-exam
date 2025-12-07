import React, { useEffect } from "react";
import { FormModal, InputField } from "../../../components";
import PropTypes from "prop-types";
import { useForm } from "@inertiajs/react";
import { useToast } from "../../../hooks";

function UpdateArtist({ open, onOpenChange, artist }) {
    const toast = useToast();
    const { data, setData, errors, put, processing, setError, reset } = useForm(
        {
            code: "",
            name: "",
        }
    );

    useEffect(() => {
        if (artist) {
            setData("code", artist.code);
            setData("name", artist.name);
        }
    }, [artist, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/artists/${artist.id}`, {
            onSuccess: () => {
                onOpenChange(false);
                reset();
                toast.success("Artist updated successfully!");
            },
        });
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

import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

function ImageUpload({
    label,
    name,
    onChange,
    currentImage,
    error,
    accept = "image/*",
    maxSize = 2,
    value = null,
}) {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (value === null) {
            setPreview(null);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [value]);

    const handleFileChange = (file) => {
        if (!file) {
            setPreview(null);
            onChange(null);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            return;
        }

        if (file.size > maxSize * 1024 * 1024) {
            alert(`File size must be less than ${maxSize}MB`);
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
        };
        reader.readAsDataURL(file);

        onChange(file);
    };

    const handleInputChange = (e) => {
        const file = e.target.files?.[0];
        handleFileChange(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        handleFileChange(file);
    };

    const displayImage = preview || currentImage;

    return (
        <div className="space-y-2">
            {label && (
                <Label className="text-sm font-medium text-foreground">
                    {label}
                </Label>
            )}

            <div
                className={`relative border-2 border-dashed rounded-lg transition-colors ${
                    dragActive
                        ? "border-primary bg-primary/5"
                        : error
                        ? "border-destructive"
                        : "border-primary/30 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {displayImage ? (
                    <div className="relative aspect-video w-full group">
                        <img
                            src={displayImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={() => inputRef.current?.click()}
                        />
                        <div
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center cursor-pointer"
                            onClick={() => inputRef.current?.click()}
                        >
                            <p className="text-white text-sm font-medium">
                                Click to change image
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex flex-col items-center justify-center p-6 cursor-pointer"
                        onClick={() => inputRef.current?.click()}
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <ImageIcon className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm text-foreground font-medium mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, GIF up to {maxSize}MB
                        </p>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}

ImageUpload.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    currentImage: PropTypes.string,
    error: PropTypes.string,
    accept: PropTypes.string,
    maxSize: PropTypes.number,
};

export const clearImageUpload = (inputRef) => {
    if (inputRef?.current) {
        inputRef.current.value = "";
    }
};

export default ImageUpload;

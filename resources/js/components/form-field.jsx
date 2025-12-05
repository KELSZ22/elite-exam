import React from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function FormField({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    error,
    className = "",
    inputClassName = "",
}) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <div className="flex items-center gap-1">
                    <Label htmlFor={name}>{label}</Label>
                    {required && <span className="text-primary">*</span>}
                </div>
            )}
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${
                    error ? "border-destructive" : ""
                } ${inputClassName}`}
            />
            {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
    );
}

FormField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
};

export default FormField;

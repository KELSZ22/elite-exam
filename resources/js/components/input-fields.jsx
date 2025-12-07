import React from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function InputField({
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

InputField.propTypes = {
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

function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
    onClear,
}) {
    const handleClear = () => {
        if (onClear) {
            onClear();
        } else {
            onChange?.({ target: { value: "" } });
        }
    };

    return (
        <div className={`relative w-full ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
            <Input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-10 pl-10 pr-10 rounded-md border border-primary/50 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
            {value && (
                <Button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors hover:bg-transparent cursor-pointer"
                    variant="ghost"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                </Button>
            )}
        </div>
    );
}

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onClear: PropTypes.func,
};

export { InputField, SearchInput };

import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X, ChevronDown, Check, Eye, EyeOff } from "lucide-react";
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
    step,
    min,
    max,
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
                step={step}
                min={min}
                max={max}
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
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

function SearchSelect({
    label,
    name,
    placeholder = "Select an option...",
    searchPlaceholder = "Search...",
    options = [],
    value,
    onChange,
    required = false,
    disabled = false,
    error,
    className = "",
    valueKey = "id",
    labelKey = "name",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const selectedOption = options.find(
        (opt) => String(opt[valueKey]) === String(value)
    );

    const filteredOptions = options.filter((opt) =>
        opt[labelKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (option) => {
        onChange?.(option[valueKey]);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange?.("");
        setSearchTerm("");
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`} ref={containerRef}>
            {label && (
                <div className="flex items-center gap-1">
                    <Label htmlFor={name}>{label}</Label>
                    {required && <span className="text-primary">*</span>}
                </div>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error
                            ? "border-destructive"
                            : "border-input hover:border-primary/50"
                    } ${isOpen ? "ring-2 ring-ring ring-offset-2" : ""}`}
                >
                    <span
                        className={
                            selectedOption
                                ? "text-foreground"
                                : "text-muted-foreground"
                        }
                    >
                        {selectedOption
                            ? selectedOption[labelKey]
                            : placeholder}
                    </span>
                    <div className="flex items-center gap-1">
                        {value && (
                            <X
                                className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
                                onClick={handleClear}
                            />
                        )}
                        <ChevronDown
                            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border border-primary/20 bg-background shadow-lg shadow-primary/10 animate-in fade-in-0 zoom-in-95">
                        <div className="p-2 border-b border-primary/10">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder={searchPlaceholder}
                                    className="h-8 pl-8 text-sm"
                                />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/20 hover:[&::-webkit-scrollbar-thumb]:bg-primary/40">
                            {filteredOptions.length === 0 ? (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    No results found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option[valueKey]}
                                        type="button"
                                        onClick={() => handleSelect(option)}
                                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors hover:bg-primary/10 ${
                                            String(value) ===
                                            String(option[valueKey])
                                                ? "bg-primary/10 text-primary"
                                                : "text-foreground"
                                        }`}
                                    >
                                        <span>{option[labelKey]}</span>
                                        {String(value) ===
                                            String(option[valueKey]) && (
                                            <Check className="h-4 w-4 text-primary" />
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
    );
}

SearchSelect.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
};

function PasswordField({
    label,
    name,
    placeholder = "Enter your password",
    value,
    onChange,
    required = false,
    disabled = false,
    error,
    className = "",
    autoComplete = "current-password",
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <div className="flex items-center gap-1">
                    <Label htmlFor={name}>{label}</Label>
                    {required && <span className="text-primary">*</span>}
                </div>
            )}
            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={`pr-12 ${error ? "border-destructive" : ""}`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                </button>
            </div>
            {error && <span className="text-sm text-destructive">{error}</span>}
        </div>
    );
}

PasswordField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
};

export { InputField, SearchInput, SearchSelect, PasswordField };

import React from "react";
import PropTypes from "prop-types";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export default SearchInput;

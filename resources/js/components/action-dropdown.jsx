import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

function ActionDropdown({ actions, row }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                    <React.Fragment key={action.label}>
                        {action.separator && index > 0 && (
                            <DropdownMenuSeparator />
                        )}
                        <DropdownMenuItem
                            onClick={() => action.onClick(row)}
                            className={
                                action.variant === "destructive"
                                    ? "text-destructive focus:text-destructive"
                                    : ""
                            }
                            disabled={action.disabled}
                        >
                            {action.icon && (
                                <action.icon className="mr-2 h-4 w-4 hover:text-primary" />
                            )}
                            {action.label}
                        </DropdownMenuItem>
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

ActionDropdown.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            icon: PropTypes.elementType,
            variant: PropTypes.oneOf(["default", "destructive"]),
            disabled: PropTypes.bool,
            separator: PropTypes.bool,
        })
    ).isRequired,
    row: PropTypes.object.isRequired,
};

export default ActionDropdown;

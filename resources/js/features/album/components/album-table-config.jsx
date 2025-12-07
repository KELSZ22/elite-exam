import React from "react";
import { Pencil, Trash } from "lucide-react";
import { ActionDropdown } from "../../../components";

export const getAlbumActions = ({ onView, onEdit, onDelete }) => [
    { label: "Edit", onClick: onEdit, icon: Pencil },
    {
        label: "Delete",
        onClick: onDelete,
        icon: Trash,
        variant: "destructive",
        separator: true,
    },
];

export const getAlbumColumns = (actions, formatCurrency) => [
    { key: "name", label: "TITLE" },
    {
        key: "artist",
        label: "ARTIST",
        render: (value) => value?.name || "Unknown",
    },
    { key: "year", label: "YEAR" },
    {
        key: "sales",
        label: "SALES",
        render: (value) => formatCurrency ? formatCurrency(value) : value,
    },
    {
        key: "actions",
        label: "ACTIONS",
        render: (_, row) => <ActionDropdown actions={actions} row={row} />,
    },
];

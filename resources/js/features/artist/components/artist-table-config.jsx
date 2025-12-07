import React from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActionDropdown } from "../../../components";

export const getArtistActions = ({ onView, onEdit, onDelete }) => [
    { label: "View", onClick: onView, icon: Eye },
    { label: "Edit", onClick: onEdit, icon: Pencil },
    {
        label: "Delete",
        onClick: onDelete,
        icon: Trash,
        variant: "destructive",
        separator: true,
    },
];

export const getArtistColumns = (actions) => [
    {
        key: "avatar",
        label: "",
        render: (_, row) => (
            <Avatar className="w-16 h-16">
                <AvatarImage
                    src={row.image || "/assets/images/artist-profile.png"}
                    alt={row.name}
                />
                <AvatarFallback>
                    {row.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        ),
    },
    { key: "code", label: "CODE" },
    { key: "name", label: "NAME" },
    {
        key: "albums_count",
        label: "ALBUMS",
        render: (value) => value || 0,
    },
    {
        key: "actions",
        label: "ACTIONS",
        render: (_, row) => <ActionDropdown actions={actions} row={row} />,
    },
];

export function getInitials(name, maxLength = 2) {
    if (!name) return "?";
    
    const parts = name.trim().split(" ").filter(Boolean);
    
    if (parts.length === 0) return "?";
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase().slice(0, maxLength);
    }
    
    const first = parts[0].charAt(0);
    const last = parts[parts.length - 1].charAt(0);
    return (first + last).toUpperCase().slice(0, maxLength);
}


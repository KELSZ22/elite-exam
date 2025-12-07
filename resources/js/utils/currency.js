export function formatCurrency(value, locale = 'en-PH', currency = 'PHP') {
    if (value === null || value === undefined || value === '') {
        return '₱0.00';
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return '₱0.00';
    }
    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numValue);
}


import { useMemo } from "react";

export function useCurrency(locale = 'en-PH', currency = 'PHP') {
    const formatCurrency = useMemo(() => {
        return (value) => {
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
        };
    }, [locale, currency]);

    return formatCurrency;
}


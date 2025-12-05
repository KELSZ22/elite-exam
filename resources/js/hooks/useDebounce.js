import { useState, useEffect, useCallback, useRef } from "react";

/**
 * useDebounce - Returns a debounced value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500)
 * @returns {any} - The debounced value
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * useDebouncedCallback - Returns a debounced callback function
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in milliseconds (default: 500)
 * @returns {Function} - The debounced function
 */
export function useDebouncedCallback(callback, delay = 500) {
    const timeoutRef = useRef(null);

    const debouncedCallback = useCallback(
        (...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debouncedCallback;
}

/**
 * useDebouncedState - Returns state with debounced value
 * @param {any} initialValue - Initial value
 * @param {number} delay - Delay in milliseconds (default: 500)
 * @returns {[any, any, Function]} - [debouncedValue, immediateValue, setValue]
 */
export function useDebouncedState(initialValue, delay = 500) {
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, delay);

    return [debouncedValue, value, setValue];
}


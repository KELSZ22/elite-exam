import { toast } from "sonner";

/**
 * useToast - Hook for showing toast notifications
 * @returns {object} Toast methods
 */
export function useToast() {
    const showSuccess = (message, options = {}) => {
        toast.success(message, {
            duration: 4000,
            ...options,
        });
    };

    const showError = (message, options = {}) => {
        toast.error(message, {
            duration: 5000,
            ...options,
        });
    };

    const showWarning = (message, options = {}) => {
        toast.warning(message, {
            duration: 4000,
            ...options,
        });
    };

    const showInfo = (message, options = {}) => {
        toast.info(message, {
            duration: 4000,
            ...options,
        });
    };

    const showLoading = (message, options = {}) => {
        return toast.loading(message, options);
    };

    const dismiss = (toastId) => {
        toast.dismiss(toastId);
    };

    const showPromise = (promise, messages, options = {}) => {
        return toast.promise(promise, {
            loading: messages.loading || "Loading...",
            success: messages.success || "Success!",
            error: messages.error || "Something went wrong",
            ...options,
        });
    };

    return {
        success: showSuccess,
        error: showError,
        warning: showWarning,
        info: showInfo,
        loading: showLoading,
        dismiss,
        promise: showPromise,
        // Raw toast for custom usage
        toast,
    };
}

// Export raw toast for direct usage
export { toast };


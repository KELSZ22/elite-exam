import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    size = "md",
    showCloseButton = true,
}) {
    const sizeClasses = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-lg",
        lg: "sm:max-w-2xl",
        xl: "sm:max-w-4xl",
        full: "sm:max-w-[calc(100vw-4rem)]",
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={sizeClasses[size]}
                showCloseButton={showCloseButton}
            >
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                )}
                <div className="py-2">{children}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    footer: PropTypes.node,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
    showCloseButton: PropTypes.bool,
};

function FormModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    onSubmit,
    submitText = "Save",
    cancelText = "Cancel",
    isSubmitting = false,
    size = "md",
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            size={size}
            footer={
                <>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="submit"
                        form="modal-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : submitText}
                    </Button>
                </>
            }
        >
            <form id="modal-form" onSubmit={handleSubmit}>
                {children}
            </form>
        </Modal>
    );
}

FormModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    isSubmitting: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
};

function ViewModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    closeText = "Close",
    size = "md",
}) {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            size={size}
            footer={
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    {closeText}
                </Button>
            }
        >
            {children}
        </Modal>
    );
}

ViewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node,
    closeText: PropTypes.string,
    size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
};

function ConfirmModal({
    open,
    onOpenChange,
    title = "Are you sure?",
    description,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
    isLoading = false,
}) {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            size="sm"
            footer={
                <>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={
                            variant === "destructive"
                                ? "destructive"
                                : "default"
                        }
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : confirmText}
                    </Button>
                </>
            }
        >
            {!description && (
                <p className="text-muted-foreground">
                    This action cannot be undone.
                </p>
            )}
        </Modal>
    );
}

ConfirmModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    variant: PropTypes.oneOf(["default", "destructive"]),
    isLoading: PropTypes.bool,
};

export { Modal, FormModal, ViewModal, ConfirmModal };

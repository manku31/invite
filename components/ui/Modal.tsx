"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { m } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { X } from "lucide-react";

export default function Modal({
  children,
  onClose,
  label,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  const reduced = useReducedMotion();
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <m.dialog
      ref={ref}
      aria-label={label}
      className={`modal ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
      onCancel={(event) => {
        event.preventDefault();
        closeRef.current();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeRef.current();
      }}
    >
      <div className="modal-inner">
        <button
          className="icon-button modal-close"
          aria-label={`Close ${label.toLowerCase()}`}
          onClick={onClose}
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </m.dialog>
  );
}

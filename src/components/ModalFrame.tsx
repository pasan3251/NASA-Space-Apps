import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function ModalFrame({
  titleId,
  onClose,
  children,
  className = "",
}: {
  titleId: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.current?.close();
      document.body.style.overflow = overflow;
      requestAnimationFrame(() => {
        const target =
          previous?.isConnected && previous !== document.body
            ? previous
            : document.querySelector<HTMLElement>(".backpack-launcher");
        target?.focus({ preventScroll: true });
      });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`ow-dialog ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        close.current();
      }}
    >
      <button
        className="ow-button modal-close"
        onClick={onClose}
        aria-label="Close Space Backpack or reward"
      >
        <X size={18} />
        Close
      </button>
      {children}
    </dialog>
  );
}

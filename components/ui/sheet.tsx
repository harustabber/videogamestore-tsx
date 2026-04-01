import React, { ReactNode } from "react";
import clsx from "clsx";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

export const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={() => onOpenChange(false)}
      />
      <div
        className={clsx(
          "relative ml-auto h-full w-full max-w-md bg-white shadow-lg transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const SheetHeader = ({ children }: { children: ReactNode }) => (
  <div className="border-b p-4">{children}</div>
);

export const SheetContent = ({ children }: { children: ReactNode }) => (
  <div className="p-4 overflow-y-auto h-full">{children}</div>
);

export const SheetFooter = ({ children }: { children: ReactNode }) => (
  <div className="border-t p-4">{children}</div>
);

import React from "react";
import clsx from "clsx";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={clsx(
          "h-4 w-4 rounded border-gray-300 text-kuromi-pink focus:ring-kuromi-pink",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

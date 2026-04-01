import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-offset-2",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50",
          variant === "outline"
            ? "border border-gray-300 hover:bg-kuromi-light"
            : variant === "ghost"
            ? "bg-transparent hover:bg-kuromi-light"
            : "bg-kuromi-pink text-white hover:bg-kuromi-purple",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

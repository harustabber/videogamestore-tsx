import React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
          variant === "outline"
            ? "border border-gray-300"
            : variant === "secondary"
            ? "bg-gray-200 text-gray-800"
            : "bg-kuromi-pink text-white",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

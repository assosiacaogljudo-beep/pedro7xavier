import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "outlined" | "filled"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors justify-start",
          variant === "search" &&
            "bg-[#3a2d4d] border-purple-700 text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500 focus-visible:border-purple-500",
          variant === "outlined" &&
            "border-2 border-purple-600 bg-transparent text-purple-100 placeholder:text-purple-400 focus-visible:ring-purple-500 focus-visible:border-purple-400",
          variant === "filled" &&
            "bg-[#2a1f3d] border-purple-800 text-purple-100 placeholder:text-purple-300 focus-visible:ring-purple-500 focus-visible:border-purple-600",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }

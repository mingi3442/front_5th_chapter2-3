import { forwardRef } from "react"

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={`p-6 pt-0 ${className || ""}`} {...props} />,
)
CardContent.displayName = "CardContent"

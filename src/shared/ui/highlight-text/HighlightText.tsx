import { forwardRef } from "react"

interface HighlightTextProps {
  text: string
  highlight: string
  className?: string
}

export const HighlightText = forwardRef<HTMLSpanElement, HighlightTextProps>(
  ({ text, highlight, className, ...props }, ref) => {
    if (!text) return null
    if (!highlight.trim()) {
      return (
        <span ref={ref} className={className} {...props}>
          {text}
        </span>
      )
    }

    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)

    return (
      <span ref={ref} className={className} {...props}>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  },
)

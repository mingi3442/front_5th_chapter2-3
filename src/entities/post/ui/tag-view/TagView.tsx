interface TagViewProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: string
}

export const TagView: React.FC<TagViewProps> = ({ tag, ...props }) => {
  return (
    <span
      {...props}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
        window.location.search.includes(`tag=${tag}`)
          ? "text-white bg-blue-500 hover:bg-blue-600"
          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
      }`}
    >
      {tag}
    </span>
  )
}

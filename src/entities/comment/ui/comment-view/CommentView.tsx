import { HighlightText } from "@/shared/ui"
import { Comment } from "../../types"

interface CommentViewProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: Comment
  searchQuery: string
}

export const CommentView: React.FC<CommentViewProps> = ({ comment, searchQuery, ...props }) => {
  return (
    <div {...props} className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment.user.username}:</span>
      <span className="truncate">
        <HighlightText text={comment.body} highlight={searchQuery} />
      </span>
    </div>
  )
}

import { Comment } from "@/entities/comment/types"
import { CommentView } from "@/entities/comment/ui"
import { Button } from "@/shared/ui"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"

interface CommentDetailItemProps {
  comment: Comment
  searchQuery: string
  handleClickDeleteComment: (commentId: number, postId: number) => void
  handleClickEditComment: (comment: Comment) => void
  handleClickLikeComment: (commentId: number, postId: number) => void
  postId: number
}

export const CommentDetailItem = ({
  comment,
  searchQuery,
  handleClickDeleteComment,
  handleClickEditComment,
  handleClickLikeComment,
  postId,
}: CommentDetailItemProps) => {
  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <CommentView comment={comment} searchQuery={searchQuery} />
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleClickLikeComment(comment.id, comment.postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleClickEditComment(comment)}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleClickDeleteComment(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

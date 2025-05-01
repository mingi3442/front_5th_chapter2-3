import { Pagination } from "@/shared/types"
import { Comment } from "../types/comment.types"

export interface CommentResponseDto extends Pagination {
  comments: Comment[]
}

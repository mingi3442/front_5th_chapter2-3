import { UserReference } from "@/entities/comment/types"
import { Pagination } from "@/shared/types"

export interface CommentDto {
  id: number
  body: string
  postId: number
  likes: number
  user: UserReference
}

export interface CommentResponseDto extends Pagination {
  comments: CommentDto[]
}

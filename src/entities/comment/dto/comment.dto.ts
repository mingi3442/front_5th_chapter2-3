import { UserReference } from "@/entities/comment/types"
import { Pagination } from "@/shared/types"

export type CommentDto = {
  id: number
  body: string
  postId: number
  likes: number
  user: UserReference
}

export type CommentResponseDto = Pagination & {
  comments: CommentDto[]
}

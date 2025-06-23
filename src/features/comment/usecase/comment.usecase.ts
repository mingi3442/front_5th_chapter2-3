import { CommentDto } from "@/entities/comment/dto"

export interface CommentUseCase {
  getAllComments: (postId: number) => Promise<CommentDto[]>
  addComment: (body: string, postId: number, userId: number) => Promise<CommentDto>
  updateComment: (id: number, body: string) => Promise<CommentDto>
  deleteComment: (id: number) => Promise<boolean>
  likeComment: (id: number) => Promise<boolean>
}

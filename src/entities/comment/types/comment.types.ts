import { CommentDto } from "@/entities/comment/dto"

export interface UserReference {
  id: number
  username: string
  fullName: string
}

export interface CommentEntity {
  body: string
  id: number
  likes: number
  postId: number
  user: UserReference
  toDto(): CommentDto
  updateBody(newBody: string): void
}

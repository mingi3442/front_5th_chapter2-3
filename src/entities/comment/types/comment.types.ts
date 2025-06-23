import { CommentDto } from "@/entities/comment/dto"

export interface UserReference {
  id: number
  username: string
  fullName: string
}

export interface CommentData {
  body: string
  id: number
  likes: number
  postId: number
  user: UserReference
  toDto(): CommentDto
}

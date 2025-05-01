import { User } from "@/entities/user/types/user.types"

export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: User
}

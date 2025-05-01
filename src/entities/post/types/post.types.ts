import { User } from "@/entities/user/types/user.types"

export interface Post {
  id: number
  title: string
  body: string
  userId?: number
  tags: string[]
  reactions?: Reactions
  views?: number
}

export interface Tag {
  name: string
  slug: string
  url: string
}

interface Reactions {
  likes: number
  dislikes: number
}

export interface PostWithAuthor extends Post {
  author?: User
}

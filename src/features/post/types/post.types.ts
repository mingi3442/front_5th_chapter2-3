import { PostWithAuthor } from "@/entities/post/types"

export interface PostsWithResult {
  posts: Array<PostWithAuthor>
  total: number
}

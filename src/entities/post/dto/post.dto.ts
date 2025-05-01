import { Pagination } from "@/shared/types"
import { Post } from "../types/post.types"

export interface PostsResponseDto extends Pagination {
  posts: Post[]
}

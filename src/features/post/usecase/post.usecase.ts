import { Post } from "@/entities/post/types"
import { PostsWithResult } from "../types"

export interface PostUseCase {
  getAllPosts: (limit: number, skip: number) => Promise<PostsWithResult>
  getPostsByTag: (tag: string) => Promise<PostsWithResult>
  getAllTags: () => Promise<Tag[]>
  searchPosts: (searchQuery: string) => Promise<PostsWithResult>
  addPost: (title: string, body: string, userId: number) => Promise<Post | null>
  updatePost: (post: Post) => Promise<Post>
  deletePost: (id: number) => Promise<Post | null>
}

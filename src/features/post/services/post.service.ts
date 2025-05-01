import { postApi } from "@/entities/post/api"
import { Post } from "@/entities/post/types"
import { userApi } from "@/entities/user/api"
import { User } from "@/entities/user/types"
import { PostsWithResult } from "../types"

export const PostService = (postApiClient: ReturnType<typeof postApi>, userApiClient: ReturnType<typeof userApi>) => ({
  getAllPosts: async (limit: number, skip: number): Promise<PostsWithResult> => {
    try {
      const postsData = await postApiClient.list(limit, skip)
      if (!postsData) return { posts: [], total: 0 }

      const usersResponse = await userApiClient.list()
      const usersData = usersResponse.users

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.find((user: User) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    } catch (error) {
      console.error("PostService getAllPosts Error:", error)
      return { posts: [], total: 0 }
    }
  },
  getPostsByTag: async (tag: string): Promise<PostsWithResult> => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([postApiClient.listByTag(tag), userApiClient.list()])
      const postsWithUsers = postsResponse.posts.map((post: Post) => ({
        ...post,
        author: usersResponse.users.find((user) => user.id === post.userId),
      }))
      return {
        posts: postsWithUsers,
        total: postsResponse.total,
      }
    } catch (error) {
      console.error("PostService getPostsByTag Error:", error)
      throw error
    }
  },
  getAllTags: async () => {
    try {
      const result = await postApiClient.getAllTags()
      if (!result) return []
      return result
    } catch (error) {
      console.error("PostService getAllTags Error:", error)
      throw error
    }
  },
  searchPosts: async (searchQuery: string): Promise<PostsWithResult> => {
    try {
      const result = await postApiClient.search(searchQuery)
      if (!result) return { posts: [], total: 0 }
      return {
        posts: result.posts,
        total: result.total,
      }
    } catch (error) {
      console.error("PostService searchPosts Error:", error)
      throw error
    }
  },
  addPost: async (title: string, body: string, userId: number) => {
    try {
      const result = await postApiClient.create(title, body, userId)
      if (!result) return null
      const { users } = await userApiClient.list()
      const author = users.find((user) => user.id === userId)

      return {
        ...result,
        author,
      }
    } catch (error) {
      console.error("PostService addPost Error:", error)
      throw error
    }
  },
  updatePost: async (post: Post) => {
    try {
      const result = await postApiClient.update(post)
      if (!result) {
        throw new Error(`Failed to update post with id: ${post.id}`)
      }
      const { users } = await userApiClient.list()
      const author = users.find((user) => user.id === result.userId)
      return {
        ...result,
        author,
      }
    } catch (error) {
      console.error("PostService updatePost Error:", error)
      throw error
    }
  },
  deletePost: async (id: number) => {
    try {
      const result = await postApiClient.remove(id)
      if (!result) return null
      return result
    } catch (error) {
      console.error("PostService deletePost Error:", error)
      throw error
    }
  },
})

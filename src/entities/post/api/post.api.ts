import { ApiClient } from "@/shared/api/api"
import { ApiResponse } from "@/shared/types"
import { PostsResponseDto } from "../dto/post.dto"
import { Post, Tag } from "../types/post.types"

export const postApi = (apiClient: ApiClient) => ({
  list: async (limit: number, skip: number): Promise<PostsResponseDto> => {
    return await apiClient
      .get<ApiResponse<PostsResponseDto>>(`/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Posts List Error: ", error)
        return error
      })
  },
  listByTag: async (tag: string): Promise<PostsResponseDto> => {
    return await apiClient
      .get<ApiResponse<PostsResponseDto>>(`/posts/tag/${tag}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Posts by Tag Error: ", error)
        return error
      })
  },
  getAllTags: async (): Promise<Tag[]> => {
    return await apiClient
      .get<ApiResponse<Tag[]>>(`/posts/tags`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Tags List Error: ", error)
        return error
      })
  },
  search: async (searchQuery: string): Promise<PostsResponseDto> => {
    return await apiClient
      .get<ApiResponse<PostsResponseDto>>(`/posts/search?q=${searchQuery}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Posts Search Error: ", error)
        return error
      })
  },
  create: async (title: string, body: string, userId: number): Promise<Post> => {
    return await apiClient
      .post<ApiResponse<Post>>(`/posts/add`, { title, body, userId })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Post Create Error: ", error)
        return error
      })
  },
  update: async (post: Post): Promise<Post> => {
    return await apiClient
      .put<ApiResponse<Post>>(`/posts/${post.id}`, post)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Post Update Error: ", error)
        return error
      })
  },
  remove: async (id: number): Promise<Post> => {
    return await apiClient
      .delete<ApiResponse<Post>>(`/posts/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Post Remove Error: ", error)
        return error
      })
  },
})

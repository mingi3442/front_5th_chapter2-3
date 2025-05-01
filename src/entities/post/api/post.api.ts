import { ApiClient } from "@/shared/api/api"
import { ApiResponse } from "@/shared/types"
import { PostsResponseDto } from "../dto/post.dto"
import { Post, Tag } from "../types/post.types"

export const postApi = (apiClient: ApiClient) => ({
  fetchAllPosts: async (limit: number, skip: number): Promise<PostsResponseDto> => {
    return await apiClient
      .get<ApiResponse<PostsResponseDto>>(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchAllPosts Error: ", error)
        return error
      })
  },
  fetchPostsByTag: async (tag: string): Promise<PostsResponseDto> => {
    return await apiClient
      .get<ApiResponse<PostsResponseDto>>(`/api/posts/tag/${tag}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchPostsByTag Error: ", error)
        return error
      })
  },
  fetchAllTags: async (): Promise<Tag[]> => {
    return await apiClient
      .get<ApiResponse<Tag[]>>(`/api/posts/tags`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchAllTags Error: ", error)
        return error
      })
  },
  fetchSearchPosts: async (searchQuery: string): Promise<PostsResponseDto> => {
    return await apiClient
      .get<ApiResponse<PostsResponseDto>>(`/api/posts/search?q=${searchQuery}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchSearchPosts Error: ", error)
        return error
      })
  },
  fetchAddPost: async (title: string, body: string, userId: number): Promise<Post> => {
    return await apiClient
      .post<ApiResponse<Post>>(`/api/posts/add`, { title, body, userId })
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchAddPost Error: ", error)
        return error
      })
  },
  fetchUpdatePost: async (post: Post): Promise<Post> => {
    return await apiClient
      .put<ApiResponse<Post>>(`/api/posts/${post.id}`, post)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchUpdatePost Error: ", error)
        return error
      })
  },
  fetchDeletePost: async (id: number): Promise<Post> => {
    return await apiClient
      .delete<ApiResponse<Post>>(`/api/posts/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchDeletePost Error: ", error)
        return error
      })
  },
})

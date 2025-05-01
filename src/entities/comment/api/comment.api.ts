import { ApiClient } from "@/shared/api/api"
import { ApiResponse } from "@/shared/types"
import { CommentResponseDto } from "../dto/comment.dto"
import { Comment } from "../types"

export const commentApi = (apiClient: ApiClient) => ({
  fetchAllComments: async (postId: number): Promise<CommentResponseDto> => {
    return await apiClient
      .get<ApiResponse<CommentResponseDto>>(`/api/comments/post/${postId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchAllComments Error: ", error)
        return error
      })
  },
  fetchAddComment: async (body: string, postId: number, userId: number): Promise<Comment> => {
    return await apiClient
      .post<ApiResponse<Comment>>(`/api/comments/add`, { body, postId, userId })
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchAddComment Error: ", error)
        return error
      })
  },
  fetchUpdateComment: async (id: number, body: string): Promise<Comment> => {
    return await apiClient
      .put<ApiResponse<Comment>>(`/api/comments/${id}`, { body })
      .then((response) => response.data)
      .catch((error) => {
        console.error("FetchUpdateComment Error: ", error)
        return error
      })
  },
  fetchDeleteComment: async (id: number): Promise<boolean> => {
    return await apiClient
      .delete<ApiResponse<void>>(`/api/comments/${id}`)
      .then((response) => response.ok)
      .catch((error) => {
        console.error("FetchDeleteComment Error: ", error)
        return error
      })
  },
  fetchLikeComment: async (id: number): Promise<boolean> => {
    return await apiClient
      .patch<ApiResponse<void>>(`/api/comments/${id}/like`)
      .then((response) => response.ok)
      .catch((error) => {
        console.error("FetchLikeComment Error: ", error)
        return error
      })
  },
})

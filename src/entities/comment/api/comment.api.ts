import { ApiClient } from "@/shared/api/api"
import { ApiResponse } from "@/shared/types"
import { CommentResponseDto } from "../dto/comment.dto"
import { Comment } from "../types"

export const commentApi = (apiClient: ApiClient) => ({
  listByPost: async (postId: number): Promise<CommentResponseDto> => {
    return await apiClient
      .get<ApiResponse<CommentResponseDto>>(`/comments/post/${postId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Comments List Error: ", error)
        return error
      })
  },
  create: async (body: string, postId: number, userId: number): Promise<Comment> => {
    return await apiClient
      .post<ApiResponse<Comment>>(`/comments/add`, { body, postId, userId })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Comment Create Error: ", error)
        return error
      })
  },
  update: async (id: number, body: string): Promise<Comment> => {
    return await apiClient
      .put<ApiResponse<Comment>>(`/comments/${id}`, { body })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Comment Update Error: ", error)
        return error
      })
  },
  remove: async (id: number): Promise<boolean> => {
    return await apiClient
      .delete<ApiResponse<void>>(`/comments/${id}`)
      .then((response) => response.ok)
      .catch((error) => {
        console.error("Comment Remove Error: ", error)
        return error
      })
  },
  likeComment: async (id: number): Promise<boolean> => {
    return await apiClient
      .patch<ApiResponse<void>>(`/comments/${id}/like`)
      .then((response) => response.ok)
      .catch((error) => {
        console.error("Comment Like Error: ", error)
        return error
      })
  },
})

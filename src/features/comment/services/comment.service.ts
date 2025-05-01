import { commentApi } from "@/entities/comment/api"
import { Comment } from "@/entities/comment/types/comment.types"

export const CommentService = (commentApiClient: ReturnType<typeof commentApi>) => ({
  getAllComments: async (postId: number): Promise<Comment[]> => {
    try {
      const { comments } = await commentApiClient.listByPost(postId)
      if (!comments) return []
      return comments
    } catch (error) {
      console.error("GetAllComments Error:", error)
      throw error
    }
  },
  addComment: async (body: string, postId: number, userId: number): Promise<Comment> => {
    try {
      const result = await commentApiClient.create(body, postId, userId)
      return result
    } catch (error) {
      console.error("AddComment Error:", error)
      throw error
    }
  },
  updateComment: async (id: number, body: string): Promise<Comment> => {
    try {
      const result = await commentApiClient.update(id, body)
      return result
    } catch (error) {
      console.error("UpdateComment Error:", error)
      throw error
    }
  },
  deleteComment: async (id: number): Promise<boolean> => {
    try {
      const result = await commentApiClient.remove(id)
      if (result) return false
      return true
    } catch (error) {
      console.error("DeleteComment Error:", error)
      throw error
    }
  },
  likeComment: async (id: number): Promise<boolean> => {
    try {
      const result = await commentApiClient.likeComment(id)
      if (!result) return false
      return true
    } catch (error) {
      console.error("LikeComment Error:", error)
      throw error
    }
  },
})

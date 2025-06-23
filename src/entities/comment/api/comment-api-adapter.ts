import { CommentData } from "@/entities/comment/types"
import { ApiClient } from "@/shared/api/api"
import { Comment } from "../core/comment"
import { CommentFactory } from "../core/comment-factory"
import { commentApi } from "./comment-api"

export interface CommentDataSource {
  getCommentsByPost(postId: number): Promise<Comment[]>
  createComment(comment: CommentData): Promise<CommentData | null>
  updateComment(comment: CommentData): Promise<CommentData | null>
  deleteComment(id: number): Promise<boolean>
  likeComment(id: number): Promise<boolean>
}

export class CommentApiAdapter implements CommentDataSource {
  private api: ReturnType<typeof commentApi>

  constructor(apiClient: ApiClient) {
    this.api = commentApi(apiClient)
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    try {
      const { comments } = await this.api.listByPost(postId)
      if (!comments || !comments.length) return []
      const adaptedComments = comments.map((apiComment) => ({
        id: apiComment.id,
        body: apiComment.body,
        postId: apiComment.postId,
        user: apiComment.user,
        likes: apiComment.likes || 0,
      }))

      return adaptedComments.map((dto) => CommentFactory.fromDTO(dto))
    } catch (error) {
      console.error("CommentApiAdapter getCommentsByPost Error:", error)
      return []
    }
  }

  async createComment(comment: Comment): Promise<Comment | null> {
    try {
      const result = await this.api.create(comment.body, comment.postId, comment.user.id)
      if (!result) return null
      return CommentFactory.fromDTO(result)
    } catch (error) {
      console.error("CommentApiAdapter createComment Error:", error)
      return null
    }
  }

  async updateComment(comment: CommentData): Promise<CommentData | null> {
    try {
      const result = await this.api.update(comment.id, comment.body)
      if (!result) return null
      return CommentFactory.fromDTO(result)
    } catch (error) {
      console.error("CommentApiAdapter updateComment Error:", error)
      return null
    }
  }

  async deleteComment(id: number): Promise<boolean> {
    try {
      return await this.api.remove(id)
    } catch (error) {
      console.error("CommentApiAdapter deleteComment Error:", error)
      return false
    }
  }

  async likeComment(id: number): Promise<boolean> {
    try {
      return await this.api.likeComment(id)
    } catch (error) {
      console.error("CommentApiAdapter likeComment Error:", error)
      return false
    }
  }
}

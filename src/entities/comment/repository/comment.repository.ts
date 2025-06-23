import { ApiClient } from "@/shared/api/api"
import { commentApi } from "../api/comment-api"
import { Comment } from "../core/comment.domain"
import { CommentFactory } from "../core/comment.factory"

/**
 * Comment 도메인 객체의 영속성을 담당하는 Repository 인터페이스
 */
export interface CommentRepository {
  getByPostId(postId: number): Promise<Comment[]>
  create(comment: Comment): Promise<Comment | null>
  update(comment: Comment): Promise<Comment | null>
  delete(id: number): Promise<boolean>
  like(id: number): Promise<boolean>
}

/**
 * API를 통해 Comment 도메인 객체의 영속성을 구현하는 Repository
 */
export class CommentApiRepository implements CommentRepository {
  private api: ReturnType<typeof commentApi>

  constructor(apiClient: ApiClient) {
    this.api = commentApi(apiClient)
  }

  async getByPostId(postId: number): Promise<Comment[]> {
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
      console.error("CommentRepository getByPostId Error:", error)
      return []
    }
  }

  async create(comment: Comment): Promise<Comment | null> {
    try {
      const result = await this.api.create(comment.body, comment.postId, comment.user.id)
      if (!result) return null
      return CommentFactory.fromDTO(result)
    } catch (error) {
      console.error("CommentRepository create Error:", error)
      return null
    }
  }

  async update(comment: Comment): Promise<Comment | null> {
    try {
      const result = await this.api.update(comment.id, comment.body)
      if (!result) return null
      return CommentFactory.fromDTO(result)
    } catch (error) {
      console.error("CommentRepository update Error:", error)
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      return await this.api.remove(id)
    } catch (error) {
      console.error("CommentRepository delete Error:", error)
      return false
    }
  }

  async like(id: number): Promise<boolean> {
    try {
      return await this.api.likeComment(id)
    } catch (error) {
      console.error("CommentRepository like Error:", error)
      return false
    }
  }
}

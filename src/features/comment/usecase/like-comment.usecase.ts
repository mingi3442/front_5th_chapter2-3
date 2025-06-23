import { CommentRepository } from "@/entities/comment/repository"

/**
 * 댓글에 좋아요를 추가하는 UseCase
 */
export class LikeCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      // Repository를 통해 좋아요 추가
      return await this.commentRepository.like(id)
    } catch (error) {
      console.error("LikeComment Error:", error)
      throw error
    }
  }
}

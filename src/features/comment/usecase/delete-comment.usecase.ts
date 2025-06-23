import { CommentRepository } from "@/entities/comment/repository"

/**
 * 댓글을 삭제하는 UseCase
 */
export class DeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      // Repository를 통해 삭제
      return await this.commentRepository.delete(id)
    } catch (error) {
      console.error("DeleteComment Error:", error)
      throw error
    }
  }
}

import { CommentDto } from "@/entities/comment/dto"
import { CommentRepository } from "@/entities/comment/repository"
import { CommentMapperService } from "@/entities/comment/service/mapper.service"

/**
 * 댓글을 수정하는 UseCase
 */
export class UpdateCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(id: number, body: string): Promise<CommentDto> {
    try {
      // 기존 댓글 가져오기 (실제로는 getById 메서드가 필요)
      const comments = await this.commentRepository.getByPostId(0)
      const existingComment = comments.find(c => c.id === id)
      if (!existingComment) throw new Error(`댓글을 찾을 수 없습니다: ${id}`)

      // 도메인 모델 업데이트 (비즈니스 로직 적용)
      existingComment.updateBody(body)

      // Repository를 통해 업데이트
      const updatedComment = await this.commentRepository.update(existingComment)
      if (!updatedComment) throw new Error("댓글 수정에 실패했습니다")

      // 도메인 모델을 DTO로 변환
      return CommentMapperService.toDto(updatedComment)
    } catch (error) {
      console.error("UpdateComment Error:", error)
      throw error
    }
  }
}

import { CommentDto } from "@/entities/comment/dto"
import { CommentRepository } from "@/entities/comment/repository"
import { CommentMapperService } from "@/entities/comment/service/mapper.service"

/**
 * 게시물의 모든 댓글을 조회하는 UseCase
 */
export class GetCommentsUseCase {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(postId: number): Promise<CommentDto[]> {
    try {
      const domainComments = await this.commentRepository.getByPostId(postId)
      return domainComments.map((comment) => CommentMapperService.toDto(comment))
    } catch (error) {
      console.error("GetComments Error:", error)
      throw error
    }
  }
}

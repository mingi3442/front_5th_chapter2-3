import { CommentFactory } from "@/entities/comment/core/comment.factory"
import { CommentDto } from "@/entities/comment/dto"
import { CommentRepository } from "@/entities/comment/repository"
import { CommentMapperService } from "@/entities/comment/service"
import { UserRepository } from "@/entities/user/repository"

/**
 * 새로운 댓글을 추가하는 UseCase
 */
export class AddCommentUseCase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(body: string, postId: number, userId: number): Promise<CommentDto> {
    try {
      // 사용자 정보 가져오기
      const user = await this.userRepository.getUserProfile(userId)

      // 새 도메인 모델 생성
      const newComment = CommentFactory.createNew(body, postId, {
        id: userId,
        username: user.username,
        fullName: user.username,
      })

      // Repository를 통해 저장
      const savedComment = await this.commentRepository.create(newComment)
      if (!savedComment) throw new Error("댓글 생성에 실패했습니다")

      // 도메인 모델을 DTO로 변환
      return CommentMapperService.toDto(savedComment)
    } catch (error) {
      console.error("AddComment Error:", error)
      throw error
    }
  }
}

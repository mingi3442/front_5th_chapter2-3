import { CommentDto } from "@/entities/comment/dto"
import { CommentFactory } from "@/entities/comment/core/comment.factory"
import { CommentRepository } from "@/entities/comment/repository"
import { CommentMapperService } from "@/entities/comment/service/mapper.service"
import { userApi } from "@/entities/user/api/user.api"
import { apiClient } from "@/shared/api/api"

/**
 * 새로운 댓글을 추가하는 UseCase
 */
export class AddCommentUseCase {
  private userApiInstance = userApi(apiClient)
  
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(body: string, postId: number, userId: number): Promise<CommentDto> {
    try {
      // 사용자 정보 가져오기
      const user = await this.userApiInstance.getProfile(userId)
      
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

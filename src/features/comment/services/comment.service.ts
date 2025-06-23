import { CommentFactory } from "@/entities/comment/core/comment.factory"
import { CommentDto } from "@/entities/comment/dto"
import { CommentRepository } from "@/entities/comment/repository"
import { CommentMapperService } from "@/entities/comment/service/mapper.service"
import { userApi } from "@/entities/user/api/user.api"
import { apiClient } from "@/shared/api/api"
import { CommentUseCase } from "../usecase/comment.usecase"

// ! User API 인스턴스 생성 개선 필요
const userApiInstance = userApi(apiClient)

export const CommentService = (commentRepository: CommentRepository): CommentUseCase => ({
  getAllComments: async (postId: number): Promise<CommentDto[]> => {
    try {
      const domainComments = await commentRepository.getByPostId(postId)
      return domainComments.map(comment => CommentMapperService.toDto(comment))
    } catch (error) {
      console.error("GetAllComments Error:", error)
      throw error
    }
  },

  addComment: async (body: string, postId: number, userId: number) => {
    try {
      // 사용자 정보 가져오기
      const user = await userApiInstance.getProfile(userId)

      // 새 도메인 모델 생성
      const newComment = CommentFactory.createNew(body, postId, {
        id: userId,
        username: user.username,
        fullName: user.username,
      })

      // Repository를 통해 저장
      const savedComment = await commentRepository.create(newComment)
      if (!savedComment) throw new Error("Failed to create comment")

      // 도메인 모델을 DTO로 변환
      return CommentMapperService.toDto(savedComment)
    } catch (error) {
      console.error("AddComment Error:", error)
      throw error
    }
  },

  updateComment: async (id: number, body: string): Promise<CommentDto> => {
    try {
      // 기존 댓글 가져오기
      const comments = await commentRepository.getByPostId(0) // 모든 댓글 가져오기 (실제로는 getById 메서드가 필요)
      const existingComment = comments.find((c) => c.id === id)
      if (!existingComment) throw new Error(`Comment with id ${id} not found`)

      // 도메인 모델 업데이트 (비즈니스 로직 적용)
      existingComment.updateBody(body)

      // Repository를 통해 업데이트
      const updatedComment = await commentRepository.update(existingComment)
      if (!updatedComment) throw new Error("Failed to update comment")

      // 도메인 모델을 DTO로 변환
      return CommentMapperService.toDto(updatedComment)
    } catch (error) {
      console.error("UpdateComment Error:", error)
      throw error
    }
  },

  deleteComment: async (id: number): Promise<boolean> => {
    try {
      // Repository를 통해 삭제
      return await commentRepository.delete(id)
    } catch (error) {
      console.error("DeleteComment Error:", error)
      throw error
    }
  },

  likeComment: async (id: number): Promise<boolean> => {
    try {
      // Repository를 통해 좋아요 추가
      return await commentRepository.like(id)
    } catch (error) {
      console.error("LikeComment Error:", error)
      throw error
    }
  },
})

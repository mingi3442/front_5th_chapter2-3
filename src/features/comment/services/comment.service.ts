import { CommentDataSource } from "@/entities/comment/api/comment-api-adapter"
import { CommentFactory } from "@/entities/comment/core/comment-factory"
import { Comment as CommentDTO } from "@/entities/comment/types/comment.types"
import { userApi } from "@/entities/user/api/user.api"
import { apiClient } from "@/shared/api/api"
import { CommentUseCase } from "../usecase/comment.usecase"

// ! User API 인스턴스 생성 개선 필요
const userApiInstance = userApi(apiClient)

export const CommentService = (commentDataSource: CommentDataSource): CommentUseCase => ({
  getAllComments: async (postId: number): Promise<CommentDTO[]> => {
    try {
      const domainComments = await commentDataSource.getCommentsByPost(postId)

      return domainComments.map((comment) => {
        const dto = comment.toDTO()
        return {
          id: dto.id,
          body: dto.body,
          postId: dto.postId,
          likes: dto.likes,
          user: dto.user,
        } as CommentDTO
      })
    } catch (error) {
      console.error("GetAllComments Error:", error)
      throw error
    }
  },

  addComment: async (body: string, postId: number, userId: number): Promise<CommentDTO> => {
    try {
      // 새 도메인 모델 생성
      const user = await userApiInstance.getProfile(userId)
      const newComment = CommentFactory.createNew(body, postId, user)

      // 데이터 소스를 통해 저장
      const savedComment = await commentDataSource.createComment(newComment)
      if (!savedComment) throw new Error("Failed to create comment")

      // 도메인 모델을 DTO로 변환
      const dto = savedComment.toDTO()
      return {
        id: dto.id,
        body: dto.body,
        postId: dto.postId,
        likes: dto.likes,
        user: dto.user,
      } as CommentDTO
    } catch (error) {
      console.error("AddComment Error:", error)
      throw error
    }
  },

  updateComment: async (id: number, body: string): Promise<CommentDTO> => {
    try {
      // 먼저 기존 도메인 모델 가져오기 (실제로는 별도 메서드가 필요할 수 있음)
      const comments = await commentDataSource.getCommentsByPost(0)
      const existingComment = comments.find((c) => c.id === id)
      if (!existingComment) throw new Error(`Comment with id ${id} not found`)

      // 도메인 모델 업데이트
      existingComment.updateBody(body)

      // 데이터 소스를 통해 업데이트
      const updatedComment = await commentDataSource.updateComment(existingComment)
      if (!updatedComment) throw new Error("Failed to update comment")

      // 도메인 모델을 DTO로 변환
      const dto = updatedComment.toDTO()
      return {
        ...dto,
        user: dto.user,
      } as CommentDTO
    } catch (error) {
      console.error("UpdateComment Error:", error)
      throw error
    }
  },

  deleteComment: async (id: number): Promise<boolean> => {
    try {
      // 데이터 소스를 통해 삭제
      return await commentDataSource.deleteComment(id)
    } catch (error) {
      console.error("DeleteComment Error:", error)
      throw error
    }
  },

  likeComment: async (id: number): Promise<boolean> => {
    try {
      // 데이터 소스를 통해 좋아요 추가
      return await commentDataSource.likeComment(id)
    } catch (error) {
      console.error("LikeComment Error:", error)
      throw error
    }
  },
})

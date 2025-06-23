import { CommentFactory } from "@/entities/comment/core/comment.factory"
import { CommentDto } from "@/entities/comment/dto"
import { CommentRepository } from "@/entities/comment/repository"
import { CommentMapperService } from "@/entities/comment/service/mapper.service"
import { UserRepository } from "@/entities/user/repository"
import { CommentUseCase } from "../usecase/comment.usecase"

export const CommentService = (
  commentRepository: CommentRepository,
  userRepository: UserRepository,
): CommentUseCase => ({
  getAllComments: async (postId: number): Promise<CommentDto[]> => {
    try {
      const domainComments = await commentRepository.getByPostId(postId)
      return domainComments.map((comment) => CommentMapperService.toDto(comment))
    } catch (error) {
      console.error("GetAllComments Error:", error)
      throw error
    }
  },

  addComment: async (body: string, postId: number, userId: number) => {
    try {
      const user = await userRepository.getUserProfile(userId)

      const newComment = CommentFactory.createNew(body, postId, {
        id: userId,
        username: user.username,
        fullName: user.username,
      })

      const savedComment = await commentRepository.create(newComment)
      if (!savedComment) throw new Error("Failed to create comment")

      return CommentMapperService.toDto(savedComment)
    } catch (error) {
      console.error("AddComment Error:", error)
      throw error
    }
  },

  updateComment: async (id: number, body: string): Promise<CommentDto> => {
    try {
      const comments = await commentRepository.getByPostId(0)
      const existingComment = comments.find((c) => c.id === id)
      if (!existingComment) throw new Error(`Comment with id ${id} not found`)

      existingComment.updateBody(body)

      const updatedComment = await commentRepository.update(existingComment)
      if (!updatedComment) throw new Error("Failed to update comment")

      return CommentMapperService.toDto(updatedComment)
    } catch (error) {
      console.error("UpdateComment Error:", error)
      throw error
    }
  },

  deleteComment: async (id: number): Promise<boolean> => {
    try {
      return await commentRepository.delete(id)
    } catch (error) {
      console.error("DeleteComment Error:", error)
      throw error
    }
  },

  likeComment: async (id: number): Promise<boolean> => {
    try {
      return await commentRepository.like(id)
    } catch (error) {
      console.error("LikeComment Error:", error)
      throw error
    }
  },
})

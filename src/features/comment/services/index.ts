// features/comment/index.ts
import { CommentApiRepository } from "@/entities/comment/repository"
import { apiClient } from "@/shared/api/api"
import { CommentService } from "./comment.service"

// 의존성 주입을 통한 서비스 생성
export const createCommentService = () => {
  const repository = new CommentApiRepository(apiClient)
  return CommentService(repository)
}

// 기본 서비스 인스턴스 제공
export const commentService = createCommentService()

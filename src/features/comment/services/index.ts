// features/comment/index.ts
import { CommentApiAdapter } from "@/entities/comment/api/comment-api-adapter"
import { apiClient } from "@/shared/api/api"
import { CommentService } from "./comment.service"

// 의존성 주입을 통한 서비스 생성
export const createCommentService = () => {
  const dataSource = new CommentApiAdapter(apiClient)
  return CommentService(dataSource)
}

// 기본 서비스 인스턴스 제공
export const commentService = createCommentService()

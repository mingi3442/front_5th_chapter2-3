import { CommentApiRepository } from "@/entities/comment/repository"
import { UserApiRepository } from "@/entities/user/repository"
import { apiClient } from "@/shared/api/api"
import {
  AddCommentUseCase,
  DeleteCommentUseCase,
  GetCommentsUseCase,
  LikeCommentUseCase,
  UpdateCommentUseCase,
} from "../usecase"

/**
 * 각 UseCase 인스턴스를 생성하는 팩토리
 */
export class CommentServiceFactory {
  private static commentRepository = new CommentApiRepository(apiClient)
  private static userRepository = new UserApiRepository(apiClient)

  static createGetCommentsUseCase(): GetCommentsUseCase {
    return new GetCommentsUseCase(this.commentRepository)
  }

  static createAddCommentUseCase(): AddCommentUseCase {
    return new AddCommentUseCase(this.commentRepository, this.userRepository)
  }

  static createUpdateCommentUseCase(): UpdateCommentUseCase {
    return new UpdateCommentUseCase(this.commentRepository)
  }

  static createDeleteCommentUseCase(): DeleteCommentUseCase {
    return new DeleteCommentUseCase(this.commentRepository)
  }

  static createLikeCommentUseCase(): LikeCommentUseCase {
    return new LikeCommentUseCase(this.commentRepository)
  }
}

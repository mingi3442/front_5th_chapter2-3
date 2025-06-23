import { CommentApiRepository } from "@/entities/comment/repository"
import { apiClient } from "@/shared/api/api"
import { 
  GetCommentsUseCase, 
  AddCommentUseCase, 
  UpdateCommentUseCase,
  DeleteCommentUseCase,
  LikeCommentUseCase
} from "../usecase"

/**
 * 각 UseCase 인스턴스를 생성하는 팩토리
 */
export class CommentServiceFactory {
  private static repository = new CommentApiRepository(apiClient)

  static createGetCommentsUseCase(): GetCommentsUseCase {
    return new GetCommentsUseCase(this.repository)
  }

  static createAddCommentUseCase(): AddCommentUseCase {
    return new AddCommentUseCase(this.repository)
  }

  static createUpdateCommentUseCase(): UpdateCommentUseCase {
    return new UpdateCommentUseCase(this.repository)
  }

  static createDeleteCommentUseCase(): DeleteCommentUseCase {
    return new DeleteCommentUseCase(this.repository)
  }

  static createLikeCommentUseCase(): LikeCommentUseCase {
    return new LikeCommentUseCase(this.repository)
  }
}

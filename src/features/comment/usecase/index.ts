export { AddCommentUseCase } from "./add-comment.usecase"
export { DeleteCommentUseCase } from "./delete-comment.usecase"
export { GetCommentsUseCase } from "./get-comments.usecase"
export { LikeCommentUseCase } from "./like-comment.usecase"
export { UpdateCommentUseCase } from "./update-comment.usecase"

// 기존 인터페이스도 유지 (점진적 마이그레이션을 위해)
export { type CommentUseCase } from "./comment.usecase"

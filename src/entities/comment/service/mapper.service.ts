import { Comment } from "../core/comment.domain"
import { CommentDto } from "../dto"

export class CommentMapperService {
  static toDto(comment: Comment): CommentDto {
    return {
      id: comment.id,
      body: comment.body,
      postId: comment.postId,
      user: comment.user,
      likes: comment.likes,
    }
  }

  static toDomain(dto: CommentDto): Comment {
    return new Comment(dto.id, dto.body, dto.postId, dto.user, dto.likes)
  }

  static toDomainList(dtos: CommentDto[]): Comment[] {
    return dtos.map((dto) => this.toDomain(dto))
  }

  static toDtoList(comments: Comment[]): CommentDto[] {
    return comments.map((comment) => this.toDto(comment))
  }
}

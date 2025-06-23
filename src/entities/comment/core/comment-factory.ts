import { CommentDto } from "@/entities/comment/dto"
import { User } from "@/entities/user/types"
import { Comment } from "./comment"

export class CommentFactory {
  /**
   * 새 댓글 객체를 생성
   */
  static createNew(body: string, postId: number, user: User): Comment {
    return new Comment(0, body, postId, {
      id: user.id,
      username: user.username,
      fullName: user.firstName + " " + user.lastName,
    })
  }

  /**
   * API 응답 DTO로부터 도메인 객체를 생성
   */
  static fromDTO(dto: CommentDto): Comment {
    return new Comment(dto.id, dto.body, dto.postId, dto.user, new Date(), dto.likes || 0)
  }

  /**
   * DTO 배열로부터 도메인 객체 배열을 생성
   */
  static fromDTOList(dtos: CommentDto[]): Comment[] {
    return dtos.map((dto) => this.fromDTO(dto))
  }
}

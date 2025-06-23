import { CommentDto } from "@/entities/comment/dto"
import { UserReference } from "@/entities/comment/types"
import { Comment } from "./comment.domain"

export class CommentFactory {
  static createNew(body: string, postId: number, user: UserReference): Comment {
    return new Comment(
      0,
      body,
      postId,
      {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
      },
      new Date(), // 현재 시간
      0, // 좋아요 0개로 시작
      null, // 아직 수정되지 않음
    )
  }

  static fromDTO(dto: CommentDto): Comment {
    return new Comment(
      dto.id,
      dto.body,
      dto.postId,
      dto.user,
      new Date(), // 생성 시간 (API에서 제공하지 않는 경우 현재 시간 사용)
      dto.likes || 0,
      null, // 수정 시간 정보가 없는 경우 null
    )
  }

  static fromDTOList(dtos: CommentDto[]): Comment[] {
    return dtos.map((dto) => this.fromDTO(dto))
  }
}

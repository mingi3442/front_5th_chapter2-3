import { CommentEntity, UserReference } from "@/entities/comment/types"
import { CommentBody, Timestamp, UserReferenceVO } from "../value-objects"

/**
 * Comment 도메인 엔티티
 * Value Object를 활용하여 비즈니스 규칙과 불변성을 강화
 */
export class Comment implements CommentEntity {
  private readonly _id: number
  private _body: CommentBody
  private readonly _postId: number
  private readonly _user: UserReferenceVO
  private readonly _createdAt: Timestamp
  private _likes: number
  private _updatedAt: Timestamp | null

  constructor(
    id: number,
    body: string,
    postId: number,
    user: UserReference,
    createdAt: Date | string | number = new Date(),
    likes: number = 0,
    updatedAt: Date | string | number | null = null,
  ) {
    this._id = id
    this._body = new CommentBody(body)
    this._postId = postId
    this._user = new UserReferenceVO(user)
    this._createdAt = new Timestamp(createdAt)
    this._likes = likes
    this._updatedAt = updatedAt ? new Timestamp(updatedAt) : null
  }

  updateBody(newBody: string): void {
    this._body = new CommentBody(newBody)
    this._updatedAt = Timestamp.now()
  }

  like(): void {
    this._likes += 1
  }

  unlike(): void {
    if (this._likes > 0) {
      this._likes -= 1
    }
  }

  get id(): number {
    return this._id
  }

  get body(): string {
    return this._body.text
  }

  get postId(): number {
    return this._postId
  }

  get user(): UserReference {
    return this._user.toDTO()
  }

  get createdAt(): Date {
    return this._createdAt.toDate()
  }

  get updatedAt(): Date | null {
    return this._updatedAt ? this._updatedAt.toDate() : null
  }

  get likes(): number {
    return this._likes
  }
}

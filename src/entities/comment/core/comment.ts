import { CommentDto } from "@/entities/comment/dto"
import { UserReference } from "@/entities/comment/types"

export class Comment {
  private _body: string
  private _likes: number
  private _updatedAt: Date | null = null

  constructor(
    private readonly _id: number,
    body: string,
    private readonly _postId: number,
    private readonly _user: UserReference,
    private readonly _createdAt: Date = new Date(),
    likes: number = 0,
  ) {
    this.validateBody(body)
    this._body = body
    this._likes = likes
  }

  private validateBody(body: string): void {
    if (!body.trim()) {
      throw new Error("댓글 내용은 비어있을 수 없습니다")
    }
    if (body.length > 1000) {
      throw new Error("댓글 내용은 1000자를 초과할 수 없습니다")
    }
  }

  updateBody(newBody: string): void {
    this.validateBody(newBody)
    this._body = newBody
    this._updatedAt = new Date()
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
    return this._body
  }

  get postId(): number {
    return this._postId
  }

  get user(): UserReference {
    return this._user
  }

  get createdAt(): Date {
    return new Date(this._createdAt)
  }

  get updatedAt(): Date | null {
    return this._updatedAt ? new Date(this._updatedAt) : null
  }

  get likes(): number {
    return this._likes
  }

  // DTO 변환 메소드
  toDTO(): CommentDto {
    return {
      id: this.id,
      body: this.body,
      postId: this.postId,
      user: this.user,
      likes: this.likes,
    }
  }
}

import { ValueObject } from "@/shared/domain/value-object"

export class CommentBody extends ValueObject<string> {
  private static readonly MAX_LENGTH = 1000

  constructor(value: string) {
    super(value)
  }

  protected validate(value: string): void {
    if (!value || !value.trim()) {
      throw new Error("댓글 내용은 비어있을 수 없습니다")
    }

    if (value.length > CommentBody.MAX_LENGTH) {
      throw new Error(`댓글 내용은 ${CommentBody.MAX_LENGTH}자를 초과할 수 없습니다`)
    }
  }

  public get text(): string {
    return this.value
  }
}

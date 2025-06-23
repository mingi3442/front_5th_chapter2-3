import { ValueObject } from "@/shared/domain/value-object"
import { UserReference } from "../types"

/**
 * 사용자 참조를 나타내는 Value Object
 */
export class UserReferenceVO extends ValueObject<UserReference> {
  constructor(value: UserReference) {
    super(value)
  }

  protected validate(value: UserReference): void {
    if (value === null || value === undefined) {
      throw new Error("사용자 참조는 null이거나 undefined일 수 없습니다")
    }

    if (typeof value.id !== "number" || value.id <= 0) {
      throw new Error("사용자 ID는 양수여야 합니다")
    }

    if (!value.username || !value.username.trim()) {
      throw new Error("사용자명은 비어있을 수 없습니다")
    }
  }

  public get id(): number {
    return this.value.id
  }

  public get username(): string {
    return this.value.username
  }

  public get fullName(): string {
    return this.value.fullName || this.value.username
  }

  public toDTO(): UserReference {
    return {
      id: this.id,
      username: this.username,
      fullName: this.fullName,
    }
  }
}

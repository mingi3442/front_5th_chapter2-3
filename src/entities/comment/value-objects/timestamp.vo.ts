import { ValueObject } from "@/shared/domain/value-object"

export class Timestamp extends ValueObject<Date> {
  constructor(value: Date | string | number = new Date()) {
    super(typeof value === "object" ? value : new Date(value))
  }

  protected validate(value: Date): void {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error("유효하지 않은 날짜 형식입니다")
    }
  }

  public static now(): Timestamp {
    return new Timestamp(new Date())
  }

  public toDate(): Date {
    return new Date(this.value)
  }
}

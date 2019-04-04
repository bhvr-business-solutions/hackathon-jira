export class Validator {
  public static isString(value: any): value is string {
    return typeof value === 'string';
  }

  public static isNonEmptyString(value: any): value is string {
    return this.isString(value) && value.trim() !== '';
  }

  public static isUrl(value: any): boolean {
    return this.isNonEmptyString(value) && /^https?\:\/\/.+$/.test(value);
  }

  public static isEmailAddress(value: any): boolean {
    return this.isNonEmptyString(value) && /.+\@.+\..+/.test(value);
  }

  public static isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
  }

  public static isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  public static isDate(value: any): value is Date {
    return value instanceof Date;
  }

  public static isObject(value: any): boolean {
    return value && typeof value === 'object';
  }

  public static isArray(data: any): data is any[] {
    return Array.isArray(data);
  }

  public static validate<T>(value: T, predicate: (data: T) => boolean, message: string): void {
    if (!predicate.bind(this)(value)) {
      throw new Error(message);
    }
  }
}

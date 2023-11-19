/* eslint-disable @typescript-eslint/no-explicit-any */

export function isNullOrUndefined(value?: unknown): value is undefined | null {
  return value === null || value === undefined;
}

export function isFalsy(value?: unknown): value is undefined | null {
  return !value;
}

export function isNullOrWhiteSpace(value?: unknown): value is undefined | null {
  return isNullOrUndefined(value) || (`${value ?? ''}`).trim().length === 0;
}

export function isNumber(value: unknown): value is number {
  return (typeof value === 'number' && Number.isFinite(value)) || /^[-]?\d+(\.\d+)?$/.test(`${value}`);
}

export function isObject(value: unknown): value is Record<string, any> {
  return !isNullOrUndefined(value) && typeof value === 'object' && !Array.isArray(value);
}

export function isArray(value: unknown): value is any[] {
  return !isNullOrUndefined(value) && Array.isArray(value);
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isJson(str: string) {
  try {
    JSON.parse(str);
  } catch (_error) {
    return false;
  }
  return true;
}

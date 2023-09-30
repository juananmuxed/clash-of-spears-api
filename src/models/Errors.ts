import { ERRORS } from "../config/data/Errors";

export class BaseError extends Error {
  status: number;
  isOperational: boolean;

  constructor(message: string | undefined, status: number, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, BaseError.prototype)
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

export class AuthError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.UNAUTHORIZED, 401)
    Object.setPrototypeOf(this, AuthError.prototype)
  }
}

export class InternalError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.INTERNAL_ERROR, 500)
    Object.setPrototypeOf(this, InternalError.prototype)
  }
}
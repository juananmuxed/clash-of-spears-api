import { ValidationError } from "sequelize";
import { ERRORS } from "../config/data/Errors";

export class BaseError extends Error {
  status: number;
  isOperational: boolean;
  errors: ValidationError | undefined;

  constructor(message: string | undefined, status: number, errors?: ValidationError, isOperational = true) {
    super(message);
    this.status = status;
    this.errors = errors;
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

export class InvalidLogin extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.INVALID_LOGIN, 401)
    Object.setPrototypeOf(this, InvalidLogin.prototype)
  }
}

export class InternalError extends BaseError {
  constructor(message?: string, errors?: ValidationError) {
    super(message || ERRORS.INTERNAL_ERROR, 500, errors)
    Object.setPrototypeOf(this, InternalError.prototype)
  }
}
export class NotFileError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.NOT_FILE_ERROR, 404)
    Object.setPrototypeOf(this, NotFileError.prototype)
  }
}

export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.BAD_REQUEST, 400)
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}

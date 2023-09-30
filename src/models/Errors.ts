import { ERRORS } from "../config/data/Errors";

/**
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: An error has ocurred
 *        status:
 *          type: string
 *        isOperational:
 *          type: boolean
 */
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

/**
 * @swagger
 * components:
 *  schemas:
 *    NotFoundError:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Not found
 *        status:
 *          type: string
 *          example: 'fail'
 *        isOperational:
 *          type: boolean
 */
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404)
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *    AuthError:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Authorization required
 *        status:
 *          type: string
 *          example: 'fail'
 *        isOperational:
 *          type: boolean
 */
export class AuthError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.UNAUTHORIZED, 401)
    Object.setPrototypeOf(this, AuthError.prototype)
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *    InternalError:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Internal server error
 *        status:
 *          type: string
 *          example: 'error'
 *        isOperational:
 *          type: boolean
 */
export class InternalError extends BaseError {
  constructor(message?: string) {
    super(message || ERRORS.INTERNAL_ERROR, 500)
    Object.setPrototypeOf(this, InternalError.prototype)
  }
}
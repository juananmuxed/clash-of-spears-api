import { Request, Response, NextFunction } from "express";
import { BaseError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";

export const useErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if(err instanceof BaseError) {
    if(err.isOperational) {
      return res.status(err.status).json({
        status: err.status < 500 && err.status >= 400 ? 'fail' :'error',
        message: err.message,
      })
    }

    // console.log(err);
    return res.status(err.status).json({
      status: 'error',
      message: 'Something went wrong'
    })
  }
  next();
}

export const useDefaultErrorHandler = (_req: Request, _res: Response, next: NextFunction) =>{
  next(new NotFoundError(ERRORS.NOT_FOUND('Endpoint')))
};
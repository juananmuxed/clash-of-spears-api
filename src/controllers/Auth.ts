import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { ERRORS } from '../config/data/Errors';
import { AuthError } from '../models/Errors';

const JWT_SECRET = process.env.JWT_SECRET || "123456";

export class Auth {
  authJWT(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if(auth){
      jwt.verify(auth, JWT_SECRET, (err: unknown) => {
        if (err) {
          next(new AuthError(ERRORS.UNAUTHORIZED))
        }
        next();
      })
    } else {
      next(new AuthError(ERRORS.UNAUTHORIZED))
    }
  }
}
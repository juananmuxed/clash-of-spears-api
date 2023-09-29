import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import debug, { IDebugger } from "debug";
import { ERRORS } from '../config/data/Errors';

const JWT_SECRET = process.env.JWT_SECRET || "123456";

const log: IDebugger = debug("middleware:JWT");

export class Auth {
  authJWT(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if(auth){
      jwt.verify(auth, JWT_SECRET, (err: unknown) => {
        if (err) {
          log("Error", err);
          return res
            .status(401)
            .send({ message: "Token error" });
        }
        next();
      })
    }else {
      res.status(401).json({ message: ERRORS.UNAUTHORIZED });
    }
  }
}
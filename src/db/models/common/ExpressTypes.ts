import { Request } from "express";

export interface TypedRequest<U> extends Request {
  body: U;
}
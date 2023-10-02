import { NextFunction, Request, Response } from "express";
import { ERRORS } from '../config/data/Errors';
import { AuthError, InternalError, InvalidLogin, NotFoundError } from '../models/Errors';
import { Authentication } from '../models/Authentication';
import { UserItem, Users } from "../db/models/Users";
import { Roles } from "../db/models/Roles";
import { ValidationError } from "sequelize";
import { TypedRequest } from "../db/models/common/ExpressTypes";

const authentication = new Authentication();

const secretRefresh = process.env.JWT_SECRET_REFRESH || 'refreshSecret';

export class AuthenticationController {
  authJWT(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if(auth){
      const verified = authentication.validateToken(auth.split(' ')[1])

      if(!verified) next(new AuthError())
      
      res.locals.jwtPayload = verified;
      next()
    } else {
      next(new AuthError())
    }
  }

  checkRole(roleName: string[]) {
    return async (_req: Request, res: Response, next: NextFunction) => {
      const jwtPayload = res.locals.jwtPayload as UserItem;
      
      try {
        const user = await Users.findOne({ where: { email: jwtPayload.email}});
        const roles = await Roles.findAll({ where: { name: roleName}})

        if(user && user.roleId && roles.some((role) => role.id === user.roleId)) next();

        else next(new AuthError(ERRORS.BAD_PERMISSIONS));
      } catch (error) {
        next(new InternalError(undefined, error as ValidationError))
      }
    };
  }

  async login(req: TypedRequest<UserItem>, res: Response, next: NextFunction) {
    const { body } = req;

    try {
      const user = await Users.findOne({where: { email: body.email }});

      if(!user) next(new NotFoundError(ERRORS.NOT_FOUND('User')));

      else {
        const validPassword = await authentication.passwordCompare(body.password, user.password || '');
  
        if(!validPassword) next(new InvalidLogin())
        res.json({ 
          user: user, 
          token: authentication.generateToken(user?.dataValues as UserItem), 
          refreshToken: authentication.generateToken(user?.dataValues as UserItem, secretRefresh) 
        })
      }
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  async signup(req: TypedRequest<UserItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const user = await Users.findOne({where: { email: body.email }});

      if(user) next(new AuthError(ERRORS.IN_USE('Email')));

      const newUser = await Users.create(body);
        
      res.status(201).json({ 
        user: newUser, 
        token: authentication.generateToken(newUser?.dataValues as UserItem),
        refreshToken: authentication.generateToken(newUser?.dataValues as UserItem, secretRefresh)
      })
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }

  async refreshToken(req: TypedRequest<{ refreshToken: string}>, res: Response, next: NextFunction) {
    const { body } = req;
        
    try {
      if(!body.refreshToken) next(new NotFoundError(ERRORS.NOT_FOUND('Refresh token')));

      const validate = authentication.validateToken(body.refreshToken, secretRefresh);

      const user = await Users.findOne({ where: { email: (validate as UserItem).email}});
        
      res.status(201).json({ 
        token: authentication.generateToken(user?.dataValues as UserItem),
        refreshToken: authentication.generateToken(user?.dataValues as UserItem, secretRefresh)
      })
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError))
    }
  }
}
import { NextFunction, Request, Response } from "express";
import { ExpansionItem, Expansions } from "../db/models/Expansions";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";
import { TypedRequest } from "../db/models/common/ExpressTypes";
import { Armies } from "../db/models/Armies";

export class ExpansionsController {

  async getExpansions(_req: Request, res: Response) {
    const expansions = await Expansions.findAll({ 
      where: {active: true},
      include: [
        { 
          model: Armies,
          as: 'armies',
          where: {
            active: true
          }
        }
      ]
    });
    
    res.json(expansions)
  }

  async getAllExpansions(_req: Request, res: Response) {
    const expansions = await Expansions.findAll();
    
    res.json(expansions)
  }

  async createExpansion(req: TypedRequest<ExpansionItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const newExpansion = await Expansions.create(body);
        
      res.status(201).json(newExpansion)
    } catch (error) {
      next(new InternalError())
    }
  }

  async updateExpansion(req: TypedRequest<ExpansionItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const expansion = await Expansions.findByPk(body.id);

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Expansion')))
      
      const newExpansion = await expansion?.update(body)
        
      res.json(newExpansion)
    } catch (error) {
      next(new InternalError())
    }
  }
 
  async deleteExpansion(req: TypedRequest<ExpansionItem>, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const expansion = await Expansions.findByPk(body.id);

      if(!expansion) next(new NotFoundError(ERRORS.NOT_FOUND('Expansion')))
      
      const newExpansion = await expansion?.destroy()
        
      res.json(newExpansion)
    } catch (error) {
      next(new InternalError())
    }
  }
}

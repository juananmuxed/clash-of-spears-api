import { NextFunction, Request, Response } from "express";
import { Expansions } from "../db/models/Expansions";
import { InternalError, NotFoundError } from "../models/Errors";
import { ERRORS } from "../config/data/Errors";

export class ExpansionController {

  /**
   * @swagger
   * /api/expansions/:
   *  get:
   *      tags:
   *          - Expansions
   *      summary: Get expansions
   *      description: Use to get all active expansions
   *      responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Expansions'
   *        '400':
   *          description: An error has ocurred
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   */
  async getExpansions(_req: Request, res: Response) {
    const expansions = await Expansions.findAll({ 
      where: {active: true} 
    });
    
    res.json(expansions)
  }

  /**
   * @swagger
   * /api/expansions/all:
   *  get:
   *      tags:
   *          - Expansions
   *      summary: Get all expansions
   *      description: Use to get all expansions included inactive
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Expansions'
   *        '400':
   *          description: An error has ocurred
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   */
  async getAllExpansions(_req: Request, res: Response) {
    const expansions = await Expansions.findAll();
    
    res.json(expansions)
  }
    
  /**
   * @swagger
   * /api/expansions:
   *  post:
   *      tags:
   *          - Expansions
   *      summary: Create new expansion
   *      description: Use to create a expansion
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Expansions'
   *        '400':
   *          description: An error has ocurred
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   */
  async createExpansion(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      const newExpansion = await Expansions.create(body);
        
      res.status(201).json(newExpansion)
    } catch (error) {
      next(new InternalError())
    }
  }
       
  /**
   * @swagger
   * /api/expansions:
   *  put:
   *      tags:
   *          - Expansions
   *      summary: Update new expansion
   *      description: Use to update a expansion
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Expansions'
   *        '400':
   *          description: An error has ocurred
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   */ 
  async updateExpansion(req: Request, res: Response, next: NextFunction) {
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

  /**
   * @swagger
   * /api/expansions:
   *  delete:
   *      tags:
   *          - Expansions
   *      summary: Delete expansion
   *      description: Use to delete a expansion
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        '200':
   *          description: Success
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Expansions'
   *        '400':
   *          description: An error has ocurred
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Error'
   */ 
  async deleteExpansion(req: Request, res: Response, next: NextFunction) {
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

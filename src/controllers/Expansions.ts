import { Request, Response } from "express";
import { Expansions } from "../db/models/Expansions";

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
  async createExpansion(req: Request, res: Response) {
    const { body } = req;
    
    try {
      const newExpansion = await Expansions.create(body);
        
      res.json(newExpansion)
    } catch (error) {
      res.status(500).json({
        message: `Error creating in DB, contact admin`,
        error: error,
      })
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
  async updateExpansion(req: Request, res: Response) {
    const { body } = req;
    
    try {
      if(!body.id) return res.status(404).json({ message: `Not ID provided to update`})

      const expansion = await Expansions.findByPk(body.id);

      if(!expansion) return res.status(404).json({ message: `Not found item with this ID`})
      
      const newExpansion = await expansion.update(body)
        
      res.json(newExpansion)
    } catch (error) {
      res.status(500).json({
        message: `Error creating in DB, contact admin`,
        error: error,
      })
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
  async deleteExpansion(req: Request, res: Response) {
    const { body } = req;
    
    try {
      if(!body.id) return res.status(404).json({ message: `Not ID provided to delete`})

      const expansion = await Expansions.findByPk(body.id);

      if(!expansion) return res.status(404).json({ message: `Not found item with this ID`})
      
      const newExpansion = await expansion.destroy()
        
      res.json(newExpansion)
    } catch (error) {
      res.status(500).json({
        message: `Error creating in DB, contact admin`,
        error: error,
      })
    }
  }
}

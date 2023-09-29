import { DataTypes } from 'sequelize'
import { db } from "../Connection";

/**
 * @swagger
 * components:
 *  schemas:
 *    Expansions:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          example: 1
 *        name:
 *          type: string
 *        active:
 *          type: boolean
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
export const Expansions = db.define('Expansions', {
  name: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN
  }
})
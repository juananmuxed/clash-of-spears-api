import { DataTypes } from 'sequelize'
import { db } from "../Connection";

export const Expansions = db.define('Expansions', {
  name: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN
  }
})
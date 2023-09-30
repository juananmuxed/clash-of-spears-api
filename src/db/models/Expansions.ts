import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { db } from "../Connection";

export interface ExpansionItem {
  id: number;
  name: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExpansionModel extends Model<InferAttributes<ExpansionModel>, InferCreationAttributes<ExpansionModel>>, ExpansionItem {}

export const Expansions = db.define<ExpansionModel>('Expansions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  active: {
    type: DataTypes.BOOLEAN
  }
})
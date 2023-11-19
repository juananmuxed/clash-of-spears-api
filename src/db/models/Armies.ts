import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { db } from "../Connection";

export interface ArmyItem extends Record<string, unknown> {
  id: number;
  name: string;
  active: boolean;
  imgUrl?: string;
  expansionId?: number;
}

export interface ArmyModel extends Model<InferAttributes<ArmyModel>, InferCreationAttributes<ArmyModel>>, ArmyItem {}

export const Armies = db.define<ArmyModel>('armies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    unique: true,
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  imgUrl: {
    type: DataTypes.STRING(255)
  },
}, { underscored: true, timestamps: false})

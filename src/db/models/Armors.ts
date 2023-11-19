/* eslint-disable no-use-before-define */
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";

export interface ArmorItem extends Record<string, unknown> {
  id: number;
  name: string;
  value?: number;
  special?: boolean;
  bookPage?: number;
  expansionId?: number;
}

export interface ArmorModel extends Model<InferAttributes<ArmorModel>, InferCreationAttributes<ArmorModel>>, ArmorItem {}

export const Armors = db.define<ArmorModel>('armors',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    value: {
      type: DataTypes.INTEGER,
    },
    special: {
      type: DataTypes.BOOLEAN,
    },
    bookPage: {
      type: DataTypes.INTEGER,
    },
  }, { underscored: true, timestamps: false}
);

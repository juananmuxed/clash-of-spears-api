import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { db } from "../Connection";

export interface UnitTypeItem {
  id: number;
  name: string;
}

export interface UnitTypeModel extends Model<InferAttributes<UnitTypeModel>, InferCreationAttributes<UnitTypeModel>>, UnitTypeItem {}

export const UnitTypes = db.define<UnitTypeModel>('unit_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(20),
    unique: true,
  }
}, { underscored: true, timestamps: false })
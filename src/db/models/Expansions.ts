import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db } from "../Connection";
import { Armies } from "./Armies";

export interface ExpansionItem {
  id: number;
  name: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExpansionModel
  extends Model<
  InferAttributes<ExpansionModel>,
  InferCreationAttributes<ExpansionModel>
  >,
  ExpansionItem {}

export const Expansions = db.define<ExpansionModel>(
  "expansions",
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
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  { underscored: true }
);

Armies.belongsTo(Expansions, { foreignKey: 'expansionId', as: 'expansion'})
Expansions.hasMany(Armies, { as: "armies" });

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { db } from "../Connection";
import { Armies } from "./Armies";
import { Weapons } from "./Weapons";
import { Armors } from "./Armors";
import { Traits } from "./Traits";

export interface ExpansionItem {
  id: number;
  name: string;
  active: boolean;
  book?: string;
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
    book: {
      type: DataTypes.STRING(255),
    },
  },
  { underscored: true, timestamps: false }
);

Armies.belongsTo(Expansions, { foreignKey: 'expansionId', as: 'expansion'})
Expansions.hasMany(Armies, { as: "armies" });

Weapons.belongsTo(Expansions, { foreignKey: 'expansionId', as: 'book'})
Expansions.hasMany(Weapons, { as: "weapons" });

Armors.belongsTo(Expansions, { foreignKey: 'expansionId', as: 'book'})
Expansions.hasMany(Armors, { as: "armors" });

Traits.belongsTo(Expansions, { foreignKey: 'expansionId', as: 'book'})
Expansions.hasMany(Traits, { as: "traits" });

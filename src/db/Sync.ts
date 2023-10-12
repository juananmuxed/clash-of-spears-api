import { Armies } from "./models/Armies"
import { Armors } from "./models/Armors";
import { Expansions } from "./models/Expansions";
import { Roles } from "./models/Roles";
import { Traits } from "./models/Traits";
import { UnitTypes } from "./models/UnitTypes";
import { Users } from "./models/Users";
import { WeaponTypes, Weapons } from "./models/Weapons";

export const syncDatabase = () => {
  Armies.sync();
  Armors.sync();
  Expansions.sync();
  Roles.sync();
  Traits.sync();
  UnitTypes.sync();
  Users.sync();
  Weapons.sync();
  WeaponTypes.sync();
}

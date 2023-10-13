import { Armies } from "./models/Armies"
import { Armors } from "./models/Armors";
import { Expansions } from "./models/Expansions";
import { Roles } from "./models/Roles";
import { Traits } from "./models/Traits";
import { UnitTypes } from "./models/UnitTypes";
import { Users } from "./models/Users";
import { WeaponTypes, Weapons } from "./models/Weapons";

export const syncDatabase = async () => {
  await Roles.sync();
  await Users.sync();
  await Expansions.sync();
  await Armies.sync();
  await Armors.sync();
  await Traits.sync();
  await UnitTypes.sync();
  await Weapons.sync();
  await WeaponTypes.sync();
}

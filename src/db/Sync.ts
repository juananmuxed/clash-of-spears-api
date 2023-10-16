import { Armies } from "./models/Armies"
import { Armors } from "./models/Armors";
import { Expansions } from "./models/Expansions";
import { Options, OptionsArmies, OptionsArmors, OptionsTraits, OptionsWeapons } from "./models/Options";
import { Roles } from "./models/Roles";
import { Traits } from "./models/Traits";
import { UnitTypes, Units, UnitsArmies, UnitsOptions, UnitsTraits } from "./models/Units";
import { Users } from "./models/Users";
import { WeaponTypes, Weapons, WeaponsWeaponTypes } from "./models/Weapons";

export const syncDatabase = async () => {
  await Roles.sync();
  await Users.sync();
  await Expansions.sync();
  await Armies.sync();
  await Traits.sync();
  await Weapons.sync();
  await Armors.sync();
  await Options.sync();
  await Units.sync();
  await UnitTypes.sync();
  await WeaponTypes.sync();
  await WeaponsWeaponTypes.sync();
  await UnitsArmies.sync();
  await UnitsTraits.sync();
  await UnitsOptions.sync();
  await OptionsArmies.sync();
  await OptionsArmors.sync();
  await OptionsWeapons.sync();
  await OptionsTraits.sync();
}

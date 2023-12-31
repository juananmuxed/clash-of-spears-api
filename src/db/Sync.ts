import { Armies } from "./models/Armies"
import { Armors } from "./models/Armors";
import { Expansions } from "./models/Expansions";
import {
  Options,
  OptionsArmies,
  OptionsArmors,
  OptionsTraits,
  OptionsTraitsIncompatible,
  OptionsTraitsNeeded,
  OptionsTraitsRemove,
  OptionsWeapons,
  OptionsWeaponsIncompatible
} from "./models/Options";
import { Roles } from "./models/Roles";
import { Traits, TraitsValues } from "./models/Traits";
import { UnitTypes, Units, UnitsArmies, UnitsOptions, UnitsTraits } from "./models/Units";
import { Users } from "./models/Users";
import { WeaponTypes, Weapons, WeaponsWeaponTypes } from "./models/Weapons";

export const syncDatabase = async () => {
  await Roles.sync();
  await Users.sync();
  await Expansions.sync();
  await Armies.sync();
  await Weapons.sync();
  await Armors.sync();
  await TraitsValues.sync();
  await Traits.sync();
  await Options.sync();
  await UnitTypes.sync();
  await Units.sync();
  await WeaponTypes.sync();
  await WeaponsWeaponTypes.sync();
  await UnitsArmies.sync();
  await UnitsTraits.sync();
  await UnitsOptions.sync();
  await OptionsArmies.sync();
  await OptionsArmors.sync();
  await OptionsWeapons.sync();
  await OptionsWeaponsIncompatible.sync();
  await OptionsTraits.sync();
  await OptionsTraitsIncompatible.sync();
  await OptionsTraitsNeeded.sync();
  await OptionsTraitsRemove.sync();
}

import { Op } from "sequelize";
import { Roles } from "./models/Roles";
import { Users } from "./models/Users"
import { Expansions } from "./models/Expansions";
import { UnitTypes } from "./models/Units";
import { WeaponTypes } from "./models/Weapons";

export const seedDatabase = async () => {
  await Roles.findOrCreate({
    where: {
      id: 1
    },
    defaults: {
      id: 1,
      name: 'admin'
    }
  });
  await Roles.findOrCreate({
    where: {
      id: 2
    },
    defaults: {
      id: 2,
      name: 'editor'
    }
  });

  await Users.findOrCreate({
    where: {
      [Op.and]: [
        { username: process.env.ROOT_USERNAME || 'root' },
        { email: process.env.ROOT_EMAIL || 'root@root.com' }
      ]
    },
    defaults: {
      email: process.env.ROOT_EMAIL || 'root@root.com',
      username: process.env.ROOT_USERNAME || 'root',
      password: process.env.ROOT_PASSWORD || '12345678',
      roleId: 1
    }
  });

  await Expansions.findOrCreate({
    where: {
      id: 1
    },
    defaults: {
      id: 1,
      name:'punic',
      active: true,
      book: 'Clash of Spears'
    }
  });

  await Expansions.findOrCreate({
    where: {
      id: 2
    },
    defaults: {
      id: 2,
      name:'riseEagles',
      active: true,
      book: 'Rise of Eagles'
    }
  });

  await Expansions.findOrCreate({
    where: {
      id: 3
    },
    defaults: {
      id: 3,
      name:'clashKatanas',
      active: true,
      book: 'Clash of Katanas'
    }
  });
  await Expansions.findOrCreate({
    where: {
      id: 4
    },
    defaults: {
      id: 4,
      name:'darkAges',
      active: false
    }
  });

  await Expansions.findOrCreate({
    where: {
      id: 5
    },
    defaults: {
      id: 5,
      name:'alexandrian',
      active: false
    }
  });

  await Expansions.findOrCreate({
    where: {
      id: 6
    },
    defaults: {
      id: 6,
      name:'arcaneCompanion',
      active: true,
      book: 'Arcane Companion'
    }
  });

  await UnitTypes.findOrCreate({
    where: {
      id: 1
    },
    defaults: {
      id: 1,
      name: 'leader'
    }
  });

  await UnitTypes.findOrCreate({
    where: {
      id: 2
    },
    defaults: {
      id: 2,
      name: 'specialCharacter'
    }
  });

  await UnitTypes.findOrCreate({
    where: {
      id: 3
    },
    defaults: {
      id: 3,
      name: 'civis'
    }
  });

  await UnitTypes.findOrCreate({
    where: {
      id: 4
    },
    defaults: {
      id: 4,
      name: 'milites'
    }
  });

  await UnitTypes.findOrCreate({
    where: {
      id: 5
    },
    defaults: {
      id: 5,
      name: 'rare'
    }
  });

  await WeaponTypes.findOrCreate({
    where: {
      id: 1
    },
    defaults: {
      id: 1,
      name: 'ranged'
    }
  });

  await WeaponTypes.findOrCreate({
    where: {
      id: 2
    },
    defaults: {
      id: 2,
      name: 'melee'
    }
  });
}

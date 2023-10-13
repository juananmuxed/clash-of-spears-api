import { Op } from "sequelize";
import { Roles } from "./models/Roles";
import { Users } from "./models/Users"

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
}

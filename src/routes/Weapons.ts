import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { WeaponsController } from "../controllers/Weapons";

const router = Router();

const weapons = new WeaponsController();
const auth = new AuthenticationController();

//TODO: block with auth & role
router.route('/')
  .get(weapons.getWeapons)
  .post( weapons.createWeapon)
  .put( weapons.updateWeapon)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.deleteWeapon);

export default router;

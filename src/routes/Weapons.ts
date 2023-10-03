import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { WeaponsController } from "../controllers/Weapons";

const router = Router();

const weapons = new WeaponsController();
const auth = new AuthenticationController();

router.route('/')
  .get(weapons.getWeapons)
  .post( weapons.createWeapon)
  .put( weapons.updateWeapon)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.deleteWeapon);

router.get('/all', [auth.authJWT, auth.checkRole(['editor', 'admin'])],  weapons.getAllWeapons)

export default router;

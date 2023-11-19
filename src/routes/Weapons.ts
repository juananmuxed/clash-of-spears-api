import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { WeaponsController } from "../controllers/Weapons";
import { uploader } from "../middlewares/Upload";

const router = Router();

const weapons = new WeaponsController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.getWeapons)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.createWeapon)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.updateWeapon)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.deleteWeapon);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.getWeaponsPaginated);

router.get('/types', [auth.authJWT, auth.checkRole(['editor', 'admin'])], weapons.getWeaponTypes);

router.post('/bulk', [auth.authJWT, auth.checkRole(['editor', 'admin']), uploader.single('file')], weapons.bulkCreateWeapons);

export default router;

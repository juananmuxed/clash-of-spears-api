import { Router } from "express";
import { Auth } from "../controllers/Auth";
import { ArmiesController } from '../controllers/Armies';

const router = Router();

const armies = new ArmiesController();
const auth = new Auth();

router.route('/')
  .get(armies.getArmies)
  .post(auth.authJWT, armies.createArmy)
  .put(auth.authJWT, armies.updateArmy)
  .delete(auth.authJWT, armies.deleteArmy);

router.get('/all', auth.authJWT,  armies.getAllArmies)

export default router;
import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { ArmiesController } from '../controllers/Armies';

const router = Router();

const armies = new ArmiesController();
const auth = new AuthenticationController();

//TODO: block with auth & role
router.route('/')
  .get(armies.getArmies)
  .post( armies.createArmy)
  .put( armies.updateArmy)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.deleteArmy);

router.get('/all', [auth.authJWT, auth.checkRole(['editor', 'admin'])],  armies.getAllArmies)

export default router;

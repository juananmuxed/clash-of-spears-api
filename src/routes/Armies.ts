import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { ArmiesController } from '../controllers/Armies';
import { uploader } from "../middlewares/Upload";

const router = Router();

const armies = new ArmiesController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.getArmies)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.createArmy)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.updateArmy)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.deleteArmy);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.getArmiesPaginated);

router.get('/all', [auth.authJWT, auth.checkRole(['editor', 'admin'])], armies.getAllArmies);

router.post('/bulk', [auth.authJWT, auth.checkRole(['editor', 'admin']), uploader.single('file')], armies.bulkCreateArmies);

export default router;

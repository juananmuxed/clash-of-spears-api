import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { UnitsController } from "../controllers/Units";
import { uploader } from "../middlewares/Upload";

const router = Router();

const units = new UnitsController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])],units.getUnits)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], units.createUnit)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], units.updateUnit)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], units.deleteUnit);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], units.getUnitsPaginated);

router.post('/bulk', [auth.authJWT, auth.checkRole(['editor', 'admin']), uploader.single('file')], units.bulkCreateUnits);

export default router;

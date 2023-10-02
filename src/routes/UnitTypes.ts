import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { UnitTypesController } from "../controllers/UnitTypes";

const router = Router();

const unitTypes = new UnitTypesController();
const auth = new AuthenticationController();

router.route('/')
  .get(unitTypes.getUnitTypes)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], unitTypes.createUnitType)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], unitTypes.updateUnitType)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], unitTypes.deleteUnitType);

export default router;
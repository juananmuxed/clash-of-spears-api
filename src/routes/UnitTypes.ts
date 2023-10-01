import { Router } from "express";
import { Auth } from "../controllers/Auth";
import { UnitTypesController } from "../controllers/UnitTypes";

const router = Router();

const unitTypes = new UnitTypesController();
const auth = new Auth();

router.route('/')
  .get(unitTypes.getUnitTypes)
  .post(auth.authJWT, unitTypes.createUnitType)
  .put(auth.authJWT, unitTypes.updateUnitType)
  .delete(auth.authJWT, unitTypes.deleteUnitType);

export default router;
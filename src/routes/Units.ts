import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { UnitsController } from "../controllers/Units";

const router = Router();

const units = new UnitsController();
const auth = new AuthenticationController();

//TODO: block with auth & role
router.route('/')
  .get(units.getUnits)
  .post( units.createUnit)
  .put( units.updateUnit)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], units.deleteUnit);

export default router;

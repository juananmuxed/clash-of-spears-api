import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { RolesController } from "../controllers/Roles";

const router = Router();

const roles = new RolesController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['admin'])], roles.getRoles)
  .post([auth.authJWT, auth.checkRole(['admin'])], roles.createRole)
  .put([auth.authJWT, auth.checkRole(['admin'])], roles.updateRole)
  .delete([auth.authJWT, auth.checkRole(['admin'])], roles.deleteRole);

export default router;
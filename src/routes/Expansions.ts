import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { ExpansionsController } from "../controllers/Expansions";

const router = Router();

const expansions = new ExpansionsController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.getExpansions)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.createExpansion)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.updateExpansion)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.deleteExpansion);

router.get('/:id', [auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.getExpansion);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.getExpansionsPaginated);

export default router;

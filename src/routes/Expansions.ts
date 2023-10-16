import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { ExpansionsController } from "../controllers/Expansions";

const router = Router();

const expansions = new ExpansionsController();
const auth = new AuthenticationController();

router.route('/')
  .get(expansions.getExpansions)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.createExpansion)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.updateExpansion)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], expansions.deleteExpansion);

//TODO: block with auth & role
router.get('/:id',  expansions.getExpansion);

export default router;

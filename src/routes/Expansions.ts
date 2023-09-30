import { Router } from "express";
import { Auth } from "../controllers/Auth";
import { ExpansionsController } from "../controllers/Expansions";

const router = Router();

const expansions = new ExpansionsController();
const auth = new Auth();

router.route('/')
  .get(expansions.getExpansions)
  .post(auth.authJWT, expansions.createExpansion)
  .put(auth.authJWT, expansions.updateExpansion)
  .delete(auth.authJWT, expansions.deleteExpansion);

router.get('/all', auth.authJWT,  expansions.getAllExpansions)

export default router;
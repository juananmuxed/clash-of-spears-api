import { Router } from "express";
import { ExpansionController } from "../controllers/Expansions";
import { Auth } from "../controllers/Auth";

const router = Router();

const expansions = new ExpansionController();
const auth = new Auth();

router.route('/')
  .get(expansions.getExpansions)
  .post(auth.authJWT, expansions.createExpansion)
  .put(auth.authJWT, expansions.updateExpansion)
  .delete(auth.authJWT, expansions.deleteExpansion);

router.get('/all', auth.authJWT,  expansions.getAllExpansions)

export default router;
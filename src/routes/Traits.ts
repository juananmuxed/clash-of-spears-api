import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { TraitsController } from "../controllers/Traits";

const router = Router();

const traits = new TraitsController();
const auth = new AuthenticationController();

//TODO: block with auth & role
router.route('/')
  .get(traits.getTraits)
  .post( traits.createTrait)
  .put( traits.updateTrait)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.deleteTrait);

router.get('/admin', traits.getTraitsPaginated);

export default router;

import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { TraitsController } from "../controllers/Traits";
import { uploader } from "../middlewares/Upload";

const router = Router();

const traits = new TraitsController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.getTraits)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.createTrait)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.updateTrait)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.deleteTrait);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.getTraitsPaginated);

router.post('/bulk', [auth.authJWT, auth.checkRole(['editor', 'admin']), uploader.single('file')], traits.bulkCreateTraits);

export default router;

import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { uploader } from "../middlewares/Upload";
import { TraitsValuesController } from "../controllers/TraitsValues";

const router = Router();

const traits = new TraitsValuesController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.getTraitsValues)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.createTraitValue)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.updateTraitValue)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.deleteTraitValue);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], traits.getTraitsValuesPaginated);

router.post('/bulk', [auth.authJWT, auth.checkRole(['editor', 'admin']), uploader.single('file')], traits.bulkCreateTraitsValues);

export default router;

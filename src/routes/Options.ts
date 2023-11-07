import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { OptionsController } from "../controllers/Options";

const router = Router();

const options = new OptionsController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], options.getOptions)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], options.createOption)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], options.updateOption)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], options.deleteOption);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], options.getOptionsPaginated);

export default router;

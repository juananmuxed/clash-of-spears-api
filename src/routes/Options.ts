import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { OptionsController } from "../controllers/Options";

const router = Router();

const options = new OptionsController();
const auth = new AuthenticationController();

//TODO: block with auth & role
router.route('/')
  .get(options.getOptions)
  .post( options.createOption)
  .put( options.updateOption)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], options.deleteOption);

router.get('/admin', options.getOptionsPaginated);

export default router;

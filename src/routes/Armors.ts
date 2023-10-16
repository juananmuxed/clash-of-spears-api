import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { ArmorsController } from "../controllers/Armors";

const router = Router();

const armors = new ArmorsController();
const auth = new AuthenticationController();

//TODO: block with auth & role
router.route('/')
  .get(armors.getArmors)
  .post( armors.createArmor)
  .put( armors.updateArmor)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], armors.deleteArmor);

export default router;

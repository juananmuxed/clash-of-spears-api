import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { ArmorsController } from "../controllers/Armors";
import { uploader } from "../middlewares/Upload";

const router = Router();

const armors = new ArmorsController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['editor', 'admin'])], armors.getArmors)
  .post([auth.authJWT, auth.checkRole(['editor', 'admin'])], armors.createArmor)
  .put([auth.authJWT, auth.checkRole(['editor', 'admin'])], armors.updateArmor)
  .delete([auth.authJWT, auth.checkRole(['editor', 'admin'])], armors.deleteArmor);

router.get('/admin', [auth.authJWT, auth.checkRole(['editor', 'admin'])], armors.getArmorsPaginated);

router.post('/bulk', [auth.authJWT, auth.checkRole(['editor', 'admin']), uploader.single('file')], armors.bulkCreateArmors);

export default router;

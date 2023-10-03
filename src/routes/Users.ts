import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";
import { UsersController } from "../controllers/Users";

const router = Router();

const users = new UsersController();
const auth = new AuthenticationController();

router.route('/')
  .get([auth.authJWT, auth.checkRole(['admin'])], users.getUsers)
  .post([auth.authJWT, auth.checkRole(['admin'])], users.createUser)
  .put([auth.authJWT, auth.checkRole(['admin'])], users.updateUser)
  .delete([auth.authJWT, auth.checkRole(['admin'])], users.deleteUser);

export default router;

import { Router } from "express";
import { Auth } from "../controllers/Auth";
import { UsersController } from "../controllers/Users";

const router = Router();

const users = new UsersController();
const auth = new Auth();

router.route('/')
  .get(auth.authJWT, users.getUsers)
  .post(auth.authJWT, users.createUser)
  .put(auth.authJWT, users.updateUser)
  .delete(auth.authJWT, users.deleteUser);

export default router;
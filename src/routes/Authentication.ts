import { Router } from "express";
import { AuthenticationController } from "../controllers/Authentication";

const router = Router();

const auth = new AuthenticationController();

router.route('/login')
  .post(auth.login)

router.route('/signup')
  .post(auth.signup)

router.route('/refresh-token')
  .post(auth.refreshToken)

export default router;
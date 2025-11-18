import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "../utils/validators/auth.validator";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;

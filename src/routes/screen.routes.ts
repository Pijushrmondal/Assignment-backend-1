import { Router } from "express";
import {
  createScreen,
  getScreens,
  toggleScreen,
} from "../controllers/screen.controller";
import {
  createScreenValidator,
  getScreensValidator,
  toggleScreenValidator,
} from "../utils/validators/screen.validator";
import { auth, editorOnly } from "../middlewares/auth.middleware";
import { validate, validateParams } from "../middlewares/validate.middleware";

const router = Router();

router.post(
  "/",
  auth,
  editorOnly,
  validate(createScreenValidator),
  createScreen
);
router.get("/", auth, validate(getScreensValidator), getScreens);

router.put(
  "/:id",
  auth,
  editorOnly,
  validateParams(toggleScreenValidator),
  toggleScreen
);

export default router;

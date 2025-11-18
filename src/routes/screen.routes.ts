import { Router } from "express";
import { getScreens, toggleScreen } from "../controllers/screen.controller";
import {
  getScreensValidator,
  toggleScreenValidator,
} from "../utils/validators/screen.validator";
import { auth, editorOnly } from "../middlewares/auth.middleware";
import { validate, validateParams } from "../middlewares/validate.middleware";

const router = Router();

router.get("/", auth, validate(getScreensValidator), getScreens);

router.put(
  "/:id",
  auth,
  editorOnly, // Only EDITOR+ can toggle
  validateParams(toggleScreenValidator),
  toggleScreen
);

export default router;

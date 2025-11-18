import { Router } from "express";
import {
  getPlaylists,
  createPlaylist,
} from "../controllers/playlist.controller";
import { auth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createPlaylistSchema,
  getPlaylistsValidator,
} from "../utils/validators/playlist.validator";

const router = Router();

router.get("/", auth, validate(getPlaylistsValidator), getPlaylists);

router.post("/", auth, validate(createPlaylistSchema), createPlaylist);

export default router;

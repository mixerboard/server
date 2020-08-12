import { Router } from "express";
import Spotify from "../../../services/Spotify";

const router = Router();

const spotify = new Spotify(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  process.env.SPOTIFY_REDIRECT_URI
);

router.get("/request-auth-url", (_req, res) => {
  res.send(spotify.getRequestAuthUrl());
});

export default router;

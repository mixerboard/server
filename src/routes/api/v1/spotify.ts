import "dotenv/config";
import { Router } from "express";
import Spotify from "../../../services/Spotify";

const router = Router();

const spotify = new Spotify(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  process.env.SPOTIFY_REDIRECT_URI
);

router.get("/request-auth-url", (_req, res) => {
  res.send({ requestAuthUrl: spotify.getRequestAuthUrl() });
});

router.post("/tokens", async (req, res) => {
  if (!req.body.code) {
    res.status(400).send("Code not found in request body");
  }

  try {
    const tokens = await spotify.getTokens(req.body.code);
    res.send(tokens);
  } catch (e) {
    res.sendStatus(400);
  }
});

export default router;

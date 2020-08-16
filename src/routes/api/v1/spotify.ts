import "dotenv/config";
import { Router } from "express";
import Spotify from "../../../services/Spotify";

const router = Router();

const spotify = new Spotify(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  process.env.SPOTIFY_REDIRECT_URI
);

router.get("/request-auth-url", (_req, res, next) => {
  try {
    const requestAuthUrl = spotify.getRequestAuthUrl();

    res.send({ requestAuthUrl });
  } catch (e) {
    next(e);
  }
});

router.post("/tokens", async (req, res, next) => {
  if (!req.body.code) {
    res.status(400).send("Authorization code required");
    return;
  }

  try {
    const tokens = await spotify.getTokens(req.body.code);

    res.send(tokens);
  } catch (e) {
    next(e);
  }
});

router.get("/library", async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const library = await spotify.pullLibrary(req.headers.authorization);

    res.send({ library });
  } catch (e) {
    next(e);
  }
});

router.patch("/library", async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
    return;
  }

  if (!req.body.library) {
    res.status(400).send("Library required");
    return;
  }

  try {
    const pushResult = await spotify.pushLibrary(
      req.headers.authorization,
      req.body.library
    );

    res.send({ pushResult });
  } catch (e) {
    next(e);
  }
});

export default router;

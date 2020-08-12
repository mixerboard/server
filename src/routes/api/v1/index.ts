import { Router } from "express";
import spotifyRoutes from "./spotify";

const router = Router();

router.use("/spotify", spotifyRoutes);

export default router;

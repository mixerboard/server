import { Router } from "express";
import apiRoutes from "./api";

const router = Router();

router.use("/api", apiRoutes);

router.head("/status", (_req, res) => {
  res.sendStatus(200);
});

export default router;

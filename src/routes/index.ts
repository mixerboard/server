import { Router } from "express";
import api from "./api";

const router = Router();

router.use("/api", api);

router.head("/status", (_req, res) => {
  res.sendStatus(200);
});

export default router;

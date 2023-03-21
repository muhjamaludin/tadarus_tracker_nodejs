import express from "express";
import {
  chartStatistics,
  createTadarus,
  getTadarusAll,
  getTadarusById,
  updateTadarus,
} from "../controllers/TadarusController.js";
import { tadarusInput } from "../middlewares/Validation.js";
const router = express.Router();

// main crud
router.get("/tadarus/:id", getTadarusById);
router.get("/tadarus", getTadarusAll);
router.put("/tadarus", tadarusInput, createTadarus);
router.post("/tadarus/:id", tadarusInput, updateTadarus);

// statistics
router.get("/tadarus/stats/chart", chartStatistics);

export default router;

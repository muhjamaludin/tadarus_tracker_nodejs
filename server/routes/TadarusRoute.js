import express from "express";
import {
  chartStatistics,
  createTadarus,
  getAllJuzQuran,
  getSurahByJuzQuran,
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

// filter juz and surah
router.get("/juz", getAllJuzQuran);
router.get("/juz/:id/surah", getSurahByJuzQuran);

export default router;

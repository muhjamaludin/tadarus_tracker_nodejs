import express from "express";
import {
  createTadarus,
  getTadarusAll,
  getTadarusById,
  updateTadarus,
} from "../controllers/TadarusController.js";
import { tadarusInput } from "../middlewares/Validation.js";
const router = express.Router();

router.get("/tadarus/:id", getTadarusById)
router.get("/tadarus", getTadarusAll);
router.put("/tadarus", tadarusInput, createTadarus);
router.post("/tadarus/:id", tadarusInput, updateTadarus)

export default router;

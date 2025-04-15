import express from 'express';
import { createSchedule, deleteSchedule, getSchedules } from '../controllers/scheduleController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", protect, createSchedule);
router.get("/", protect, getSchedules);
router.delete("/:id", protect, deleteSchedule);

export default router;
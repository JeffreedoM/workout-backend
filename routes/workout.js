import express from "express";
const router = express.Router();
import requireAuth from "../middleware/requireAuth.js";
import {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/WorkoutController.js";

router.use(requireAuth);

// GET all workouts
router.get("/", getAllWorkouts);

// GET a single workout
router.get("/:id", getOneWorkout);

// POST a new workout
router.post("/", createWorkout);

// UPDATE a workout
router.put("/:id", updateWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

export default router;

import express from "express";
import mongoose from "mongoose";

import Workout from "../models/WorkoutModel.js";

// POST
// Creating a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const newWorkout = await Workout.create({ title, load, reps, user_id });

    if (newWorkout) {
      res.status(201).json(newWorkout);
    } else {
      res.status(400).json({ error: "Error creating workout" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message, emptyFields });
  }
};

// GET
// Getting all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workout = await Workout.find({ user_id });

    if (workout) {
      return res.status(200).json(workout);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Getting one workout
const getOneWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);

    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(400).json({
        error: "No records existed.",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// UPDATING Workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findOneAndUpdate({
      _id: id,
      title: title,
      reps: reps,
      load: load,
    });

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }

    const workout = await Workout.findOneAndDelete({ _id: id });

    return res.status(200).json(workout);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export {
  createWorkout,
  getAllWorkouts,
  getOneWorkout,
  updateWorkout,
  deleteWorkout,
};

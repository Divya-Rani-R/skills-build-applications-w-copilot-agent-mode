"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// GET /api/workouts/ - Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.default.find();
        res.json({
            message: 'Get all workouts',
            data: workouts,
            count: workouts.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.default.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: `Get workout with ID ${id}`,
            data: workout,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// GET /api/workouts/user/:userId - Get personalized workout suggestions for user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Get workouts matching user's fitness level
        const workouts = await Workout_1.default.find({
            recommendedFor: user.fitnessLevel,
        });
        res.json({
            message: `Get personalized workout suggestions for user ${userId}`,
            userFitnessLevel: user.fitnessLevel,
            data: workouts,
            count: workouts.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch personalized workouts' });
    }
});
// POST /api/workouts/ - Create a new workout
router.post('/', async (req, res) => {
    try {
        const { title, description, type, difficulty, duration, estimatedCalories, instructions, equipment, targetMuscles, recommendedFor } = req.body;
        const workout = new Workout_1.default({
            title,
            description,
            type,
            difficulty,
            duration,
            estimatedCalories,
            instructions,
            equipment: equipment || [],
            targetMuscles: targetMuscles || [],
            recommendedFor: recommendedFor || [difficulty],
        });
        await workout.save();
        res.status(201).json({
            message: 'Create new workout',
            data: workout,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const workout = await Workout_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({
            message: `Update workout with ID ${id}`,
            data: workout,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout_1.default.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(204).json({
            message: `Delete workout with ID ${id}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;

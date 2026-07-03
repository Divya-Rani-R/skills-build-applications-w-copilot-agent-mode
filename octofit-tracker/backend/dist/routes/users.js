"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// GET /api/users/ - Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json({
            message: 'Get all users',
            data: users,
            count: users.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: `Get user with ID ${id}`,
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST /api/users/ - Create a new user
router.post('/', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, fitnessLevel } = req.body;
        const user = new User_1.default({
            username,
            email,
            password,
            firstName,
            lastName,
            fitnessLevel: fitnessLevel || 'beginner',
        });
        await user.save();
        res.status(201).json({
            message: 'Create new user',
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const user = await User_1.default.findByIdAndUpdate(id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            message: `Update user with ID ${id}`,
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).json({
            message: `Delete user with ID ${id}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// GET /api/teams/ - Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team_1.default.find()
            .populate('leader', 'username firstName lastName')
            .populate('members', 'username firstName lastName');
        res.json({
            message: 'Get all teams',
            data: teams,
            count: teams.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findById(id)
            .populate('leader', 'username firstName lastName')
            .populate('members', 'username firstName lastName');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `Get team with ID ${id}`,
            data: team,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST /api/teams/ - Create a new team
router.post('/', async (req, res) => {
    try {
        const { name, description, leader, members } = req.body;
        const team = new Team_1.default({
            name,
            description: description || '',
            leader,
            members: members || [leader],
        });
        await team.save();
        await team.populate('leader', 'username firstName lastName');
        await team.populate('members', 'username firstName lastName');
        res.status(201).json({
            message: 'Create new team',
            data: team,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT /api/teams/:id - Update team
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const team = await Team_1.default.findByIdAndUpdate(id, updates, { new: true })
            .populate('leader', 'username firstName lastName')
            .populate('members', 'username firstName lastName');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({
            message: `Update team with ID ${id}`,
            data: team,
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const team = await Team_1.default.findByIdAndDelete(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(204).json({
            message: `Delete team with ID ${id}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
exports.default = router;

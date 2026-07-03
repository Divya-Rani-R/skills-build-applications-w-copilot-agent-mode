"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
// GET /api/leaderboard/ - Get leaderboard rankings
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .populate('user', 'username firstName lastName profileImage')
            .sort({ rank: 1 })
            .limit(100);
        res.json({
            message: 'Get leaderboard rankings',
            data: leaderboard,
            total_users: leaderboard.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET /api/leaderboard/:id - Get leaderboard entry by user ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const entry = await Leaderboard_1.default.findOne({ user: id }).populate('user', 'username firstName lastName profileImage');
        if (!entry) {
            return res.status(404).json({ error: 'Leaderboard entry not found' });
        }
        res.json({
            message: `Get leaderboard entry for user ${id}`,
            data: entry,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
// GET /api/leaderboard/team/:teamId - Get team leaderboard
router.get('/team/:teamId', async (req, res) => {
    try {
        const { teamId } = req.params;
        const team = await Team_1.default.findById(teamId).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        const memberIds = team.members.map((m) => m._id);
        const leaderboard = await Leaderboard_1.default.find({ user: { $in: memberIds } })
            .populate('user', 'username firstName lastName profileImage')
            .sort({ rank: 1 });
        res.json({
            message: `Get team ${teamId} leaderboard`,
            team: {
                id: team._id,
                name: team.name,
                totalPoints: team.totalPoints,
            },
            data: leaderboard,
            count: leaderboard.length,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
exports.default = router;

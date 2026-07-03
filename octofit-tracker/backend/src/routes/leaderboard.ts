import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';

const router = Router();

// GET /api/leaderboard/ - Get leaderboard rankings
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'username firstName lastName profileImage')
      .sort({ rank: 1 })
      .limit(100);
    res.json({
      message: 'Get leaderboard rankings',
      data: leaderboard,
      total_users: leaderboard.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:id - Get leaderboard entry by user ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const entry = await Leaderboard.findOne({ user: id }).populate('user', 'username firstName lastName profileImage');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json({
      message: `Get leaderboard entry for user ${id}`,
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// GET /api/leaderboard/team/:teamId - Get team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId).populate('members');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const memberIds = team.members.map((m: any) => m._id);
    const leaderboard = await Leaderboard.find({ user: { $in: memberIds } })
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

export default router;

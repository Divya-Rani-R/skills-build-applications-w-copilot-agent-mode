import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET /api/activities/ - Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username firstName lastName')
      .sort({ date: -1 });
    res.json({
      message: 'Get all activities',
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('user', 'username firstName lastName');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity with ID ${id}`,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// POST /api/activities/ - Log a new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { user, type, description, duration, caloriesBurned, distance, date } = req.body;
    
    // Calculate points based on calories and duration
    const points = Math.floor((caloriesBurned / 100) * 50 + (duration / 10) * 5);
    
    const activity = new Activity({
      user,
      type,
      description,
      duration,
      caloriesBurned,
      distance: distance || undefined,
      points,
      date: date || new Date(),
    });

    await activity.save();
    res.status(201).json({
      message: 'Log new activity',
      data: activity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// PUT /api/activities/:id - Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const activity = await Activity.findByIdAndUpdate(id, updates, { new: true });
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json({
      message: `Update activity with ID ${id}`,
      data: activity,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.status(204).json({
      message: `Delete activity with ID ${id}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;

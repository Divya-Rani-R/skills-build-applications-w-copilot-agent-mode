import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users/ - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Get all users',
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `Get user with ID ${id}`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users/ - Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, fitnessLevel } = req.body;
    
    const user = new User({
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
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      message: `Update user with ID ${id}`,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(204).json({
      message: `Delete user with ID ${id}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;

import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('🌱 Seeding the octofit_db database with test data\n');
    
    await mongoose.connect(connectionString);
    console.log('✓ Connected to octofit_db\n');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Cleared existing collections\n');

    // Create seed users
    console.log('📝 Creating users...');
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@octofit.com',
        password: 'hashed_password_1',
        firstName: 'Alex',
        lastName: 'Johnson',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        bio: 'Marathon enthusiast and fitness coach',
        fitnessLevel: 'advanced',
        totalPoints: 2500,
      },
      {
        username: 'jordan_cyclist',
        email: 'jordan@octofit.com',
        password: 'hashed_password_2',
        firstName: 'Jordan',
        lastName: 'Smith',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
        bio: 'Love cycling and outdoor adventures',
        fitnessLevel: 'intermediate',
        totalPoints: 1800,
      },
      {
        username: 'taylor_swimmer',
        email: 'taylor@octofit.com',
        password: 'hashed_password_3',
        firstName: 'Taylor',
        lastName: 'Williams',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor',
        bio: 'Swimming is life',
        fitnessLevel: 'advanced',
        totalPoints: 2200,
      },
      {
        username: 'casey_yogi',
        email: 'casey@octofit.com',
        password: 'hashed_password_4',
        firstName: 'Casey',
        lastName: 'Brown',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey',
        bio: 'Yoga and mindfulness practitioner',
        fitnessLevel: 'intermediate',
        totalPoints: 1500,
      },
      {
        username: 'morgan_gym',
        email: 'morgan@octofit.com',
        password: 'hashed_password_5',
        firstName: 'Morgan',
        lastName: 'Davis',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
        bio: 'Gym rat and fitness enthusiast',
        fitnessLevel: 'intermediate',
        totalPoints: 1650,
      },
      {
        username: 'sam_beginner',
        email: 'sam@octofit.com',
        password: 'hashed_password_6',
        firstName: 'Sam',
        lastName: 'Wilson',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
        bio: 'Just starting my fitness journey',
        fitnessLevel: 'beginner',
        totalPoints: 450,
      },
    ]);
    console.log(`✓ Created ${users.length} users\n`);

    // Create teams
    console.log('📝 Creating teams...');
    const teams = await Team.insertMany([
      {
        name: 'Cardio Kings',
        description: 'Team focused on cardio exercises and running',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[5]._id],
        totalPoints: 5850,
      },
      {
        name: 'Water Warriors',
        description: 'Swimming and water sports enthusiasts',
        leader: users[2]._id,
        members: [users[2]._id],
        totalPoints: 2200,
      },
      {
        name: 'Zen Masters',
        description: 'Yoga and mindfulness focused team',
        leader: users[3]._id,
        members: [users[3]._id, users[4]._id],
        totalPoints: 3150,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams\n`);

    // Update users with team references
    await User.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { team: teams[2]._id });
    await User.updateOne({ _id: users[4]._id }, { team: teams[2]._id });

    // Create activities
    console.log('📝 Creating activities...');
    const now = new Date();
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        description: 'Morning 10k run in the park',
        duration: 50,
        caloriesBurned: 620,
        distance: 10,
        points: 150,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[0]._id,
        type: 'gym',
        description: 'Weight training session',
        duration: 75,
        caloriesBurned: 480,
        points: 120,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        description: 'Evening bike ride',
        duration: 60,
        caloriesBurned: 540,
        distance: 25,
        points: 140,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[2]._id,
        type: 'swimming',
        description: 'Pool lap session - 2 km',
        duration: 45,
        caloriesBurned: 580,
        distance: 2,
        points: 160,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[3]._id,
        type: 'yoga',
        description: 'Morning vinyasa flow class',
        duration: 60,
        caloriesBurned: 240,
        points: 90,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[4]._id,
        type: 'gym',
        description: 'Strength training - chest day',
        duration: 90,
        caloriesBurned: 520,
        points: 130,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[5]._id,
        type: 'walking',
        description: 'Casual neighborhood walk',
        duration: 30,
        caloriesBurned: 180,
        distance: 2,
        points: 60,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        type: 'sports',
        description: 'Basketball game with friends',
        duration: 60,
        caloriesBurned: 600,
        points: 150,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${activities.length} activities\n`);

    // Create leaderboard entries
    console.log('📝 Creating leaderboard entries...');
    const leaderboardEntries = await Leaderboard.insertMany([
      {
        user: users[0]._id,
        rank: 1,
        totalPoints: 2500,
        activitiesCount: 2,
        totalDuration: 125,
        totalCalories: 1100,
        lastActivityDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[2]._id,
        rank: 2,
        totalPoints: 2200,
        activitiesCount: 1,
        totalDuration: 45,
        totalCalories: 580,
        lastActivityDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[1]._id,
        rank: 3,
        totalPoints: 1800,
        activitiesCount: 2,
        totalDuration: 120,
        totalCalories: 1140,
        lastActivityDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[4]._id,
        rank: 4,
        totalPoints: 1650,
        activitiesCount: 1,
        totalDuration: 90,
        totalCalories: 520,
        lastActivityDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[3]._id,
        rank: 5,
        totalPoints: 1500,
        activitiesCount: 1,
        totalDuration: 60,
        totalCalories: 240,
        lastActivityDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        user: users[5]._id,
        rank: 6,
        totalPoints: 450,
        activitiesCount: 1,
        totalDuration: 30,
        totalCalories: 180,
        lastActivityDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries\n`);

    // Create workout plans
    console.log('📝 Creating workout plans...');
    const workouts = await Workout.insertMany([
      {
        title: 'Beginner Running Program',
        description: 'A gentle introduction to running for beginners',
        type: 'cardio',
        difficulty: 'beginner',
        duration: 30,
        estimatedCalories: 250,
        instructions: [
          'Warm up with 5 minutes of walking',
          'Alternate 1 minute running with 2 minutes walking for 20 minutes',
          'Cool down with 5 minutes of walking',
        ],
        equipment: [],
        targetMuscles: ['legs', 'cardiovascular'],
        recommendedFor: ['beginner'],
      },
      {
        title: 'HIIT Cardio Blast',
        description: 'High Intensity Interval Training for advanced athletes',
        type: 'cardio',
        difficulty: 'advanced',
        duration: 25,
        estimatedCalories: 400,
        instructions: [
          'Warm up with 3 minutes of light cardio',
          'Perform 30 seconds of maximum intensity exercise',
          'Rest for 30 seconds',
          'Repeat 12 times',
          'Cool down with 2 minutes of walking',
        ],
        equipment: [],
        targetMuscles: ['cardiovascular', 'full body'],
        recommendedFor: ['intermediate', 'advanced'],
      },
      {
        title: 'Strength Training - Upper Body',
        description: 'Build upper body strength with weights',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 60,
        estimatedCalories: 350,
        instructions: [
          'Warm up with 5 minutes of cardio',
          'Bench press: 4 sets of 8 reps',
          'Bent over rows: 4 sets of 8 reps',
          'Shoulder press: 3 sets of 10 reps',
          'Bicep curls: 3 sets of 12 reps',
          'Cool down with stretching',
        ],
        equipment: ['dumbbells', 'bench', 'barbell'],
        targetMuscles: ['chest', 'back', 'shoulders', 'biceps'],
        recommendedFor: ['intermediate', 'advanced'],
      },
      {
        title: 'Yoga for Relaxation',
        description: 'Gentle yoga sequence for stress relief and flexibility',
        type: 'flexibility',
        difficulty: 'beginner',
        duration: 45,
        estimatedCalories: 150,
        instructions: [
          'Child pose - 1 minute',
          'Cat-cow stretch - 10 rounds',
          'Downward dog - 5 breaths',
          'Forward fold - 1 minute',
          'Seated twist - 1 minute each side',
          'Corpse pose - 5 minutes',
        ],
        equipment: ['yoga mat'],
        targetMuscles: ['full body', 'flexibility'],
        recommendedFor: ['beginner', 'intermediate'],
      },
      {
        title: 'Swimming Endurance Builder',
        description: 'Build swimming endurance with varied strokes',
        type: 'cardio',
        difficulty: 'intermediate',
        duration: 50,
        estimatedCalories: 450,
        instructions: [
          'Freestyle warm-up: 200m',
          'Freestyle: 10 x 100m with 30 sec rest',
          'Backstroke: 200m',
          'Cool down: 100m freestyle easy pace',
        ],
        equipment: ['swimming pool'],
        targetMuscles: ['full body', 'cardiovascular'],
        recommendedFor: ['intermediate', 'advanced'],
      },
      {
        title: 'Core Strengthening Routine',
        description: 'Focus on core muscles for better stability',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 30,
        estimatedCalories: 200,
        instructions: [
          'Planks: 3 sets of 45 seconds',
          'Russian twists: 3 sets of 20 reps',
          'Crunches: 3 sets of 15 reps',
          'Leg raises: 3 sets of 12 reps',
          'Mountain climbers: 3 sets of 30 seconds',
        ],
        equipment: ['mat'],
        targetMuscles: ['core', 'abs'],
        recommendedFor: ['beginner', 'intermediate', 'advanced'],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workout plans\n`);

    console.log('✅ Database seeding complete!');
    console.log(`
📊 Summary:
  - Users: ${users.length}
  - Teams: ${teams.length}
  - Activities: ${activities.length}
  - Leaderboard entries: ${leaderboardEntries.length}
  - Workout plans: ${workouts.length}
    `);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

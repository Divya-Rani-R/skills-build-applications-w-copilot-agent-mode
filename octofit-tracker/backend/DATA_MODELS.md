# OctoFit Tracker Data Models & Sample Data

## Database Configuration
- **MongoDB Connection**: `mongodb://localhost:27017/octofit_db`
- **Environment Variable**: `MONGODB_URI` (optional override)
- **Database Name**: `octofit_db`

## Data Models

### User Model
Represents application users with fitness profiles.

**Fields:**
- `username` (string, unique, required) - Unique username in lowercase
- `email` (string, unique, required) - User email address
- `password` (string, required) - Hashed password
- `firstName` (string, required) - User's first name
- `lastName` (string, required) - User's last name
- `profileImage` (string, optional) - Profile image URL
- `bio` (string, optional, max 500 chars) - User biography
- `fitnessLevel` (enum, required) - One of: 'beginner', 'intermediate', 'advanced'
- `team` (ObjectId ref, optional) - Reference to Team
- `totalPoints` (number, default 0) - Cumulative fitness points
- `timestamps` - createdAt, updatedAt

**Sample Data Created**: 6 users with varying fitness levels

### Team Model
Groups users for team-based competitions.

**Fields:**
- `name` (string, unique, required) - Team name
- `description` (string, optional, max 500 chars) - Team description
- `leader` (ObjectId ref, required) - Team leader (User reference)
- `members` (array of ObjectIds) - Team member references
- `totalPoints` (number, default 0) - Cumulative team points
- `timestamps` - createdAt, updatedAt

**Sample Data Created**: 3 teams (Cardio Kings, Water Warriors, Zen Masters)

### Activity Model
Logs individual fitness activities.

**Fields:**
- `user` (ObjectId ref, required) - Activity creator
- `type` (enum, required) - Activity type: 'running', 'cycling', 'swimming', 'gym', 'yoga', 'walking', 'sports'
- `description` (string, required, max 500 chars) - Activity description
- `duration` (number, required, min 1) - Duration in minutes
- `caloriesBurned` (number, required, min 0) - Estimated calories burned
- `distance` (number, optional, min 0) - Distance in kilometers
- `points` (number, required, default 0) - Points awarded for activity
- `date` (Date, required) - Activity date
- `timestamps` - createdAt, updatedAt

**Sample Data Created**: 8 activities across different types
**Auto-calculation**: Points = (caloriesBurned/100)*50 + (duration/10)*5

### Leaderboard Model
Tracks user rankings and fitness statistics.

**Fields:**
- `user` (ObjectId ref, unique, required) - User reference
- `rank` (number, default 0) - Leaderboard rank
- `totalPoints` (number, default 0) - Total accumulated points
- `activitiesCount` (number, default 0) - Number of logged activities
- `totalDuration` (number, default 0) - Total minutes exercised
- `totalCalories` (number, default 0) - Total calories burned
- `lastActivityDate` (Date, default now) - Date of last activity
- `timestamps` - createdAt, updatedAt

**Sample Data Created**: 6 leaderboard entries (1 per user)

### Workout Model
Pre-defined workout plans for user recommendations.

**Fields:**
- `title` (string, required) - Workout title
- `description` (string, required, max 1000 chars) - Detailed description
- `type` (enum, required) - Type: 'cardio', 'strength', 'flexibility', 'balance', 'sport'
- `difficulty` (enum, required) - Level: 'beginner', 'intermediate', 'advanced'
- `duration` (number, required, min 5) - Duration in minutes
- `estimatedCalories` (number, required, min 0) - Estimated calories burned
- `instructions` (array of strings, required) - Step-by-step instructions
- `equipment` (array of strings, optional) - Required equipment
- `targetMuscles` (array of strings, optional) - Muscles targeted
- `recommendedFor` (array of enums) - Fitness levels: 'beginner', 'intermediate', 'advanced'
- `timestamps` - createdAt, updatedAt

**Sample Data Created**: 6 workout plans

## Sample Data Summary

### Users (6)
1. alex_runner - Advanced, 2500 points
2. jordan_cyclist - Intermediate, 1800 points
3. taylor_swimmer - Advanced, 2200 points
4. casey_yogi - Intermediate, 1500 points
5. morgan_gym - Intermediate, 1650 points
6. sam_beginner - Beginner, 450 points

### Teams (3)
1. Cardio Kings - 3 members, 5850 points
2. Water Warriors - 1 member, 2200 points
3. Zen Masters - 2 members, 3150 points

### Activities (8)
- Running, Cycling, Swimming, Gym, Yoga, Walking, Sports
- Dates: Last 1-3 days
- Varied durations and calorie burns

### Leaderboard (6 entries)
- Ranked by total points
- Statistics: activities count, duration, calories
- Last activity dates tracked

### Workouts (6 plans)
1. Beginner Running Program
2. HIIT Cardio Blast
3. Strength Training - Upper Body
4. Yoga for Relaxation
5. Swimming Endurance Builder
6. Core Strengthening Routine

## Seeding Instructions

### Automatic Seeding
```bash
cd octofit-tracker/backend

# Option 1: Using the setup script
./setup-db.sh

# Option 2: Direct seed execution
npm run dev src/scripts/seed.ts
```

### Seed Script Features
- Clears all existing collections
- Creates all models with relationships
- Populates with realistic sample data
- Updates team references in users
- Logs detailed progress with emoji indicators

### Seed Output
```
🌱 Seeding the octofit_db database with test data

✓ Connected to octofit_db
✓ Cleared existing collections

📝 Creating users...
✓ Created 6 users

📝 Creating teams...
✓ Created 3 teams

📝 Creating activities...
✓ Created 8 activities

📝 Creating leaderboard entries...
✓ Created 6 leaderboard entries

📝 Creating workout plans...
✓ Created 6 workout plans

✅ Database seeding complete!
```

## API Verification

After seeding, verify data creation with API endpoints:

```bash
# Get all users
curl http://localhost:8000/api/users/

# Get all teams
curl http://localhost:8000/api/teams/

# Get all activities
curl http://localhost:8000/api/activities/

# Get leaderboard
curl http://localhost:8000/api/leaderboard/

# Get workouts
curl http://localhost:8000/api/workouts/
```

Or use the provided test script:
```bash
./test-api.sh
```

## Database Reset

To reseed the database with fresh sample data:

1. Stop the running server (if any)
2. Run: `npm run dev src/scripts/seed.ts`
3. All collections will be cleared and repopulated

## Notes

- Mongoose automatically creates collections on first insert
- All timestamps (createdAt, updatedAt) are automatic
- Sample activity dates are set to last 1-3 days
- User passwords in sample data are placeholder hashes (not real hashes)
- Team relationships properly establish leader and member links
- Leaderboard entries calculate real statistics from activities

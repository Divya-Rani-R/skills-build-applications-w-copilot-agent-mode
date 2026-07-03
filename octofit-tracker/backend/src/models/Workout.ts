import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  estimatedCalories: number;
  instructions: string[];
  equipment?: string[];
  targetMuscles?: string[];
  recommendedFor: ('beginner' | 'intermediate' | 'advanced')[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'balance', 'sport'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 5,
    },
    estimatedCalories: {
      type: Number,
      required: true,
      min: 0,
    },
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    equipment: [
      {
        type: String,
      },
    ],
    targetMuscles: [
      {
        type: String,
      },
    ],
    recommendedFor: [
      {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);

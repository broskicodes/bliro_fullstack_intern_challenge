import mongoose from 'mongoose';
import Meeting from './models/meeting';

const dbUri = process.env.MONGODB_URI || 'fallback_default_mongodb_uri';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB connected...');

    // Optional: Clear existing data and insert dummy data
    await resetDatabase();

    console.log('Database reset completed...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Function to reset database
const resetDatabase = async () => {
  // Example: Drop collections or specific documents
  await Meeting.deleteMany({});

  // Insert dummy data 
  for (let i = 0; i < 10; i++) {
    await Meeting.create({
      title: `Dummy Meeting ${i + 1}`,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000) // 1 hour later
    });
  }
};

export default connectDB;

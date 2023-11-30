import mongoose, { Document } from 'mongoose';

export interface IMeeting extends Document {
  title: string;
  startTime: Date;
  endTime: Date;
  // Add other properties as needed
  description: string;
  participants: string[];
}

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  // Define other fields as needed
  description: { type: String, required: false },
  participants: { type: [String], required: true }
});

const Meeting = mongoose.model<IMeeting>('Meeting', meetingSchema);
export default Meeting;

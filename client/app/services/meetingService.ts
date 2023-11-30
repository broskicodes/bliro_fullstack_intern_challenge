import axios from 'axios';
import { Meeting } from '../models/Meeting';

const API_BASE_URL = 'http://localhost:3000/api/meetings';

export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    const response = await axios.get<Meeting[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
};

export const createMeeting = async (meetingDetails: Meeting): Promise<string> => {
  try {
    const response = await axios.post<Meeting>(API_BASE_URL, meetingDetails);
    return response.data.id;
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw error;
  }
}

export const updateMeeting = async (meetingId: string, meetingDetails: Partial<Meeting>): Promise<boolean> => {
  try {
    await axios.put(`${API_BASE_URL}/${meetingId}`, meetingDetails);
    return true;
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw error;
  }
}

export const deleteMeeting = async (meetingId: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/${meetingId}`);
    return true;
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw error;
  }
}
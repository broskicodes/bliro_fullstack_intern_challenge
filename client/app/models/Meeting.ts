export interface Meeting {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
  participants: string[];
}

export const validateMeetingDetails = (meeting: Partial<Meeting>) => {
  if (!meeting.title) {
    throw new Error('Title is required');
  }
  if (!meeting.startTime) {
    throw new Error('Start time is required');
  }
  if (!meeting.endTime) {
    throw new Error('End time is required');
  }
  if (!meeting.participants) {
    throw new Error('Participants are required');
  } else {
    const emailRegex = /\S+@\S+\.\S+/;
    meeting.participants.forEach((participant) => {
      if (!emailRegex.test(participant)) {
        throw new Error('Invalid email address in participants list');
      }
    });
  }

  if (new Date(meeting.startTime).getTime() < Date.now()) {
    throw new Error('Start time cannot be in the past');
  }
  if (new Date(meeting.startTime).getTime() > new Date(meeting.endTime).getTime()) {
    throw new Error('Start time cannot be greater than end time');
  }
}
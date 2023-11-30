import { PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { Meeting } from "../models/Meeting"
import { getMeetings, createMeeting as createMeetingApi, updateMeeting as updateMeetingApi, deleteMeeting as deleteMeetingApi } from "../services/meetingService";

interface MeetingListProviderContext {
  meetingList: Meeting[];
  createMeeting: (meetingDetails: Meeting) => Promise<boolean>;
  updateMeeting: (meetingId: string, meetingDetails: Partial<Meeting>) => Promise<boolean>;
  deleteMeeting: (meetingId: string) => Promise<boolean>;
}

/*
 * Global context for managing the list of meetings
 */
export const MeetingListContext = createContext<MeetingListProviderContext>({
  meetingList: [],
  createMeeting: (_meetingDetails) => {
    throw new Error("MeetingListProvider not initialized");
  },
  updateMeeting: (_meetingId, _meetingDetails) => {
    throw new Error("MeetingListProvider not initialized");
  },
  deleteMeeting: (_meetingId) => {
    throw new Error("MeetingListProvider not initialized");
  },
})

/*
 * Provider component for interacting with the context
 */
const MeetingListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [meetingList, setMeetingList] = useState<Meeting[]>([]);

  const createMeeting = useCallback(async (meetingDetails: Meeting) => {
    try {
      const meetingId = await createMeetingApi(meetingDetails);

      if (!meetingId) {
        return false;
      }

      const upadtedList = await getMeetings();
      setMeetingList(upadtedList);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const updateMeeting = useCallback(async (meetingId: string, meetingDetails: Partial<Meeting>) => {
    try {
      const result = await updateMeetingApi(meetingId, meetingDetails);
      
      if (!result) {
        return false;
      }

      const upadtedList = await getMeetings();
      setMeetingList(upadtedList);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const deleteMeeting = useCallback(async (meetingId: string) => {
    try {
      const result = await deleteMeetingApi(meetingId);

      if (!result) {
        return false;
      }

      const upadtedList = await getMeetings();
      setMeetingList(upadtedList);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  useEffect(() => {
    getMeetings().then(setMeetingList);
  }, []);

  const value: MeetingListProviderContext = useMemo(() => ({
    meetingList,
    createMeeting,
    updateMeeting,
    deleteMeeting
  }), [meetingList, createMeeting, updateMeeting, deleteMeeting]);

  return <MeetingListContext.Provider value={value}>{children}</MeetingListContext.Provider>;
} 

export default MeetingListProvider;
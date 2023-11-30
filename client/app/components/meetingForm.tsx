import { Box, Button, Modal, TextField } from "@mui/material";
import { Meeting, validateMeetingDetails } from "../models/Meeting";
import { useCallback, useContext, useEffect, useState } from "react";
import { MeetingListContext } from "../providers/MeetingListProvider";

interface MeetingProps {
  meetingId: string | null;
  open: boolean;
  handleClose: () => void;
}

const MeetingForm: React.FC<MeetingProps> = ({ meetingId, open, handleClose }) => {
  const [meeting, setMeeting] = useState<Partial<Meeting>>({});
  const { meetingList, createMeeting, updateMeeting } = useContext(MeetingListContext);

  const close = useCallback(() => {
    setMeeting({});
    handleClose();
  }, [handleClose]);

  const handleSubmit =  useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      meeting.participants = meeting.participants ?? [];
      validateMeetingDetails(meeting);
    } catch (error) {
      alert(error);
      return;
    }

    /* This form component is used for both creating and updating meetings.
      * The existence of a meetingId determines whether to update of create
      */
    if (meetingId) {
      await updateMeeting(meetingId, meeting);
    } else {
      await createMeeting(meeting as Meeting);
    }

    close();
  }, [updateMeeting, createMeeting, meeting, close]);

  useEffect(() => {
    const meeting = meetingList.find((meeting) => meeting._id === meetingId);
    setMeeting(meeting || {});
  }, [meetingList, meetingId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box color={'#000000'} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <div>
            <div style={{ 'fontSize': '20px', paddingBottom: "6px" }}>Create meeting</div>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                value={meeting.title}
                onChange={(event) => setMeeting({ ...meeting, title: event.target.value })}
                />
              <TextField
                label="Description (Optional)"
                value={meeting.description}
                onChange={(event) => setMeeting({ ...meeting, description: event.target.value })}
                />
              <TextField
                label="Participants (Comma separated)"
                value={meeting.participants?.join(",")}
                onChange={(event) => setMeeting({ ...meeting, participants: event.target.value.replaceAll(/\s+/g, "").split(",") ?? [] })}
                />
              <div>
                <label htmlFor="start">Start date:</label>
                <input id="start" type="datetime-local" value={meeting.startTime?.replace('Z', '')} onChange={(event) => setMeeting({ ...meeting, startTime: event.target.value })} />
              </div>
              <div>
                <label htmlFor="end">End date:</label>
                <input id="end" type="datetime-local" value={meeting.endTime?.replace('Z', '')} onChange={(event) => setMeeting({ ...meeting, endTime: event.target.value })} />
              </div>
              <div>
                <Button onClick={close}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </div>
      </Box>
    </Modal>
  );
}

export default MeetingForm;

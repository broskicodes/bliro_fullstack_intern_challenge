import { Box, Button, Modal } from "@mui/material";
import { Meeting } from "../models/Meeting";
import { useContext, useEffect, useState } from "react";
import { MeetingListContext } from "../providers/MeetingListProvider";
import MeetingForm from "./meetingForm";

interface MeetingProps {
  meetingId: string | null;
  open: boolean;
  handleClose: () => void;
}

const MeetingDetails: React.FC<MeetingProps> = ({ meetingId, open, handleClose }) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const { meetingList, deleteMeeting } = useContext(MeetingListContext);

  useEffect(() => {
    const meeting = meetingList.find((meeting) => meeting._id === meetingId);
    setMeeting(meeting || null);
  }, [meetingList, meetingId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box color={'#000000'} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          {meeting && (
            <div>
              <div>
                <div style={{ 'fontSize': '20px' }}>{meeting.title}</div>
                <div>Description: {meeting.description ?? "N/A"}</div>
                <div>Start time: {meeting.startTime}</div>
                <div>End time: {meeting.endTime}</div>
                <div>Participants: {meeting.participants.map((participant, i) => (
                  <div key={i}>{participant}</div>
                ))}</div>
              </div>
              <div>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={() => { setUpdateFormOpen(true); }}>Update</Button>
                <Button onClick={async () => { 
                  await deleteMeeting(meetingId as string);
                  handleClose();
                }}>Delete</Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <MeetingForm meetingId={meetingId} open={updateFormOpen} handleClose={() => { setUpdateFormOpen(false); handleClose(); }} />
    </div>
  );
}

export default MeetingDetails;

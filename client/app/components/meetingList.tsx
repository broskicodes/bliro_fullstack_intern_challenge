'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MeetingDetails from './meetingDetails';
import { MeetingListContext } from '../providers/MeetingListProvider';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('default', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

const MeetingList: React.FC = () => {
  const { meetingList } = useContext(MeetingListContext);
  const [open, setOpen] = useState(false);
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setMeetingId(null);
  }, []);

  const handleOpen = useCallback((id: string) => {
    setOpen(true);
    setMeetingId(id);
  }, []);

  return (
    <Paper elevation={3}>
      <List>
        {meetingList.map((meeting, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start" onClick={() => handleOpen(meeting._id) } >
              <ListItemText
                primary={meeting.title}
                secondary={
                  <>
                    <div>Start: {formatDate(meeting.startTime)}</div>
                    <div>End: {formatDate(meeting.endTime)}</div>
                  </>
                }
              />
            </ListItem>
            {index < meetingList.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
      <MeetingDetails open={open} meetingId={meetingId} handleClose={handleClose} />
    </Paper>
  );
};

export default MeetingList;

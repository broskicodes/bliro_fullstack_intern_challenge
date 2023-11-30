'use client'

// Home.tsx
import React, { useCallback, useState } from 'react';
import MeetingList from './components/meetingList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MeetingListProvider from './providers/MeetingListProvider';
import { Button } from '@mui/material';
import MeetingForm from './components/meetingForm';

const Home: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);

  const handleClose = useCallback(() => {
    setFormOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setFormOpen(true);
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Meetings
      </Typography>
      <MeetingListProvider>
        <Button onClick={handleOpen}>Create meeting</Button>
        <MeetingList />
        <MeetingForm meetingId={null} open={formOpen} handleClose={handleClose} />
      </MeetingListProvider>
    </Container>
  );
};

export default Home;

# Bliro Full Stack Intern Take-Home Challenge

## Objective:
Enhance the existing meeting application by adding new features and improving the codebase.

## Prerequisites:
- Familiarity with TypeScript, React, Node.js, and Express.
- Understanding of RESTful APIs and database operations.
- Setup:
  - Clone the provided repository containing the initial code for both the client (app) and server (server). 
  - Set up the environment to run both applications using the corresponding README.md files you find in each repository.

## Tasks:

### Backend (1.5 hours)
**Database Schema Extension:** Extend the Meeting model to include a description field and a participants field, which should be an array of strings representing participant emails.

- Modify the corresponding TypeScript interface in Meeting.ts.
- Update the meetingService.ts to handle the new fields.

**API Endpoint Creation:** Create new endpoints in meetingRoutes.ts and the corresponding controller logic in meetingController.ts to:

- Add a new meeting.
- Update an existing meeting.
- Delete a meeting.

**Validation Middleware:** Implement middleware to validate meeting data for create and update operations (check for valid dates, non-empty title, and valid email format for participants).

### Frontend (1.5 hours)
**Meeting Details View:** Implement a new component meetingDetails.tsx that:

- Displays all details of a meeting when a meeting in the list is clicked.
- Allows editing and deleting the meeting using the new API endpoints.

**Create Meeting Form:** Develop a form to add new meetings, including title, start date, end date, description, and participants. Validate inputs on the client side.

**Global State Management:** Set up a simple global state management (Context API or Redux) to manage and update the meetings list across components.

### Testing (1 hour)
- Write integration tests for the new backend endpoints.
- Write unit tests for the new frontend components.

### Bonus (Optional):

- Implement authentication middleware on the backend that checks for a mock auth token before allowing any meeting modifications.
- Add filtering and sorting capabilities to the meetings list based on title, date, and number of participants.


## Deliverables:

- A README.md file documenting how to set up and run your project as well as a brief description of the work done and any assumptions made.
- A Git repository with your complete project code, including commit history to show your work progress.

## Evaluation Criteria:
- Functionality: The application works as expected without errors.
- Code Quality: Clean, modular, and well-commented code.
- Design: Implementation of clean and responsive UI components.
- Problem Solving: Effective use of algorithms and data structures.
- Testing: Adequate test coverage and use of testing best practices.

Please ensure all features are fully implemented within a 4-hour timeframe. Good luck!

----

# Description of my solution

## Backend

- Added relevant fields to Meeting shema
- Implemented middleware to validate meeting details on client
- All api endpoints had already been implemented properly, so there was nothing for me to do on that front.

## Frontend

- Created a component to display meeting details in a modal (`components/meetingDetails.tsx`)
- Created a component to facilitate creation and updates for meetings in a separate modal (`components/meetingForm.tsx`)
- Created a context provider for managing the list of meetings (`providers/MeetingListProvider.tsx`)
- Added functions for calling the new api routes to `services/meetingsService.ts`
- Created `utils.ts` for storing simple helper functions
- Implemented client side validation for meeting details in `models/Meeting.ts`

**Note:** There is a slight bug when updating the dates of meetings due to conversion from UTC to local time

## Tests

Not implemented. I am not yet familiar with front-end component unit tests or back-end integration tests

**Time to complete:** ~3-3.5 hours
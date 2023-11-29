import express from 'express';
import meetingController from '../controllers/meetingController';

const router = express.Router();

/*

  */
const meetingValidationMiddleware = (req: any, res: any, next: express.NextFunction) => {
  const { 
    title, 
    startTime, 
    endTime, 
    description, 
    participants 
  } = req.body;

  // Validate title exists
  if (typeof title !== "string" || title.length === 0) {
    return res.status(500).json({ message: "Invalid meeting title" })
  }

  // Validate description (allowed to be empty)
  if (description && typeof description !== "string") {
    return res.status(500).json({ message: "Invalid meeting description" })
  }
  // Validate dates (assumes dates are passed as strings in the request body)
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);

  if (isNaN(startTimeDate.getTime()) || isNaN(endTimeDate.getTime())) {
    return res.status(500).json({ message: "Proviided times are not valid dates" });
  }

  // Set times to valid Date objects
  req.body.startTime = startTimeDate;
  req.baody.endTime = endTimeDate;

  // Validate participants is an array
  if (!participants || !Array.isArray(participants)) {
    return res.status(500).json({ message: "Provided participants is not valid array" });
  }

  // Validate emails in participants array
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  for (const p in participants) {
    if (!emailRegex.test(p)) {
      return res.status(500).json({ message: "Participants array contains invalid email" });
    }
  }

  next();
}

/**
 * @swagger
 * /api/meetings:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       201:
 *         description: The meeting was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Some server error
 */
router.post('/', meetingValidationMiddleware, meetingController.createMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting id
 *     responses:
 *       200:
 *         description: The meeting description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', meetingController.getMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   put:
 *     summary: Update a meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: The meeting was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', meetingValidationMiddleware, meetingController.updateMeeting); // Current validation middleware requires that valid values must be passed for all fields on update

/**
 * @swagger
 * /api/meetings/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting id
 *     responses:
 *       200:
 *         description: The meeting was deleted
 *       404:
 *         description: Meeting not found
 *       500:
 *         description: Some server error
 */
router.delete('/:id', meetingController.deleteMeeting);

/**
 * @openapi
 * /api/meetings:
 *   get:
 *     summary: Lists all the meetings
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: A list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Server error
 */
router.get('/', meetingController.listMeetings);

export default router;

import { Router } from 'express';
import  path from 'path';
import TimelinesController from '../controllers/controller_timelines'
const timelinesController = new TimelinesController();
const timelineRouter = Router();

timelineRouter.put('/update/:id', timelinesController.updateTimeline)
timelineRouter.delete('/:id', timelinesController.deleteTimelineById);
timelineRouter.post('/add', timelinesController.addTimeline);
timelineRouter.get('/getByHallId/:hallId', timelinesController.getTimelineByHallId);
export default timelineRouter;
import { Router } from 'express';
import  path from 'path';
import TimelinesController from '../controllers/controller_timelines'
const timelinesController = new TimelinesController();
const timelineRouter = Router();
import validationCheck from '../validator/validationCheck';

timelineRouter.put('/update/:id',validationCheck("updateTimelineSchema"), timelinesController.updateTimeline)
timelineRouter.delete('/:id',validationCheck("deleteTimelineByIdSchema"), timelinesController.deleteTimelineById);
timelineRouter.post('/add',validationCheck('addTimelineSchema'), timelinesController.addTimeline);
timelineRouter.get('/getByHallId/:hallId',validationCheck("getTimelineByHallIdSchema"), timelinesController.getTimelineByHallId);
export default timelineRouter;
import { Router } from 'express';
import ReportsController from '../controllers/controller_reports';
const reportsController = new ReportsController();
const reportsRouter = Router();

reportsRouter.get("/list", reportsController.getListOfReports);
reportsRouter.get("/download/:id", reportsController.download);
reportsRouter.post("/filter", reportsController.filterByDate);

export default  reportsRouter;

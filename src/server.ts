import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import serverRouter from "./api/routes/servers";
import hallRouter from "./api/routes/hallRouter";
import filmRouter from "./api/routes/filmRouter";
import chairRouter from './api/routes/chairRouter';
import reportsRouter from './api/routes/reportsRouter';
import timelineRouter from './api/routes/timelineRouter';
import reservationRouter from './api/routes/reservationRouter';
import userRouter from './api/routes/usersRouter';
import deleteUnpaidReservations  from "./api/cron/cron"
import unpaidReport from "./api/cron/cronReport"


deleteUnpaidReservations.start();
unpaidReport.start();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/server', serverRouter);
app.use('/api/halls', hallRouter);
app.use('/api/films', filmRouter);
app.use('/api/chairs', chairRouter);
app.use('/api/timeline', timelineRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/users', userRouter);
app.use('/api/reports', reportsRouter);

app.listen(PORT, () => {
    console.log(`Server run ${PORT}...`)
});





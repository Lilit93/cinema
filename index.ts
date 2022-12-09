import express from 'express';
import bodyParser from "body-parser";
import path from 'path';
import router from './routes/servers';
import serverRouter from "./routes/servers";
import hallRouter from "./routes/hallRouter";
import filmRouter from "./routes/filmRouter";
import chairRouter from './routes/chairRouter';
import timelineRouter from './routes/timelineRouter';
import reservationRouter from './routes/reservationRouter';
import userRouter from './routes/usersRouter';
import {models} from "./db";
import cron from "./cron/cron"

cron.start()
const app = express();
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

app.listen(PORT, () => {
    console.log(`Server run ${PORT}...`)
});





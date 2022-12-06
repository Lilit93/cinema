import moment from 'moment';
import db from '../db/models';
import  { Op } from 'sequelize';

let thisMoment = moment();
const thisMomentPluse30 = thisMoment.add( 30, 'minute' ).utc().format('MMMM Do YYYY, h:mm')
// @ts-ignore
class  Cron {
    public  lessThen30minute = async () => {
        return await db.Reservations.findAll({
            where: {
                payed: false
         }, 
        include : [
            {
                as: 'timelinesReservations',
                model : db.Timelines,
                where: {
                    [Op.and] : [
                        {
                            started: {  [Op.lte]: db.Sequelize.literal(("(NOW() AT TIME ZONE 'UTC' + '30MIN')")), }
                        },
                        {
                            started: {  [Op.gte]: db.Sequelize.literal(("(NOW() AT TIME ZONE 'UTC')")), }
                        }
                ]
                  
                    
                }
            }
        ]
    })
    }
}
const cron = new Cron;
try{
    (async () => {
    const res = await cron.lessThen30minute();
    console.log("Res", res);
})()} 
catch (e) {
    console.log(e)
};


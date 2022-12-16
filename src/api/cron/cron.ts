import moment from 'moment';
import db from '../../db/models';
import  { Op } from 'sequelize';
import cron from 'node-cron';

let thisMoment = moment();
const thisMomentPluse30 = thisMoment.add( 30, 'minute' ).utc().format('MMMM Do YYYY, h:mm')
// @ts-ignore
class  DeleteReservations {
    public  lessThen30minute = async () => {
        let a = await db.Reservations.findAll({
            where: {
                payed: false,
            },
        include : [
            {
                as: 'timelinesReservations',
                model : db.Timelines,
                where: {
                    [Op.and] : [
                        {
                            started: {  [Op.lte]: db.Sequelize.literal(("(NOW() AT TIME ZONE 'UTC' + '60MIN')")), }
                        },
                        {
                            started: {  [Op.gte]: db.Sequelize.literal(("(NOW() AT TIME ZONE 'UTC')")), }
                        }
                    ]
                },
                plain: true,
            }
        ],
    })
    const ids = a.map(res => res.id)
    return await db.Reservations.update({ deleted: true },{ where : { id : ids }})
    };
};

const deleteReservations = new DeleteReservations ;

const deleteUnpaidReservations = cron.schedule('*/1 * * * *', async () => {
    await deleteReservations.lessThen30minute();
});

export default deleteUnpaidReservations


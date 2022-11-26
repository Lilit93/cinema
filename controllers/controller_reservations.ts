import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'
class ReservationController {
    public addReservation = async (req, res) => {
        try {
            const { timelineId, chairId } = req.body;
            const findeTimeline = await db.Reservations.findOne({ where :{ timelineId: timelineId } });
            const findeChair = await db.Reservations.findOne({ where :{ chairId: chairId }});
            if(findeTimeline && findeChair){
                return res.status(400).send({message: "Chair is not available"})
            }
                //@ts-ignore
                await db.Reservations.create( { timelineId, chairId } );
                return res.status(200).send({ message: 'Reservation is added' });
        } catch (e) {

            console.log(e);
            res.status(400).send({error: e})
        }
    };
    public getAll = async (req, res) => {
        const reservations = await db.Reservations.findAll();
       return res.status(200).json(reservations)

    };
    public updateReservation = async (req, res) => {
        try{
            const { id } = req.params;
            const {timelineId, chairId } = req.body;
            if (timelineId || chairId){
                await db.Reservations.update( {timelineId, chairId}, {where: {id:  id}}) 
                res.status(200).send({message: 'Reservation is updated'})
                return;
            }
            return res.status(400).send({message: 'Reservation is not found'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    };

    public deleteReservation = async (req, res) => {
        try{
            const {id} = req.params;
            const hall =await db.Reservations.findOne({ where:{ id }});
            if(!hall){
                return res.status(400).send({message: 'Reservation not found'})
            }
            await db.Reservations.destroy({where: {id: id}}) 
            res.status(200).send({message: 'Reservation is deleted'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    };
    public getReservationsByFilmId = async (req, res) => {
        try{
        const {filmId} = req.params;
        const isFilmExist = await db.Films.findAll({where: { id: filmId }, include: [{model: db.Timelines, as: 'timelines' }]}) 
        console.log("eeee", isFilmExist)
        }catch(e) {
            console.log(e);
            res.status(400).send({error: e})
        }
    } 
}

export default ReservationController

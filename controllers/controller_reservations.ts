import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'
class ReservationController {
    public addReservation = async (req, res) => {
        try {
            const { timelineId, ChairId } = req.body;
            await db.Halls.create( { timelineId, ChairId } );
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
            const {timelineId, ChairId } = req.body;
            if (timelineId || ChairId){
                await db.Reservations.update( {timelineId, ChairId}, {where: {id:  id}}) 
                res.status(200).send({message: 'Reservation is updated'})
            }
            return res.status(400).send({message: 'Reservation is not found'})
        } catch(e){

            
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
            await db.Halls.destroy({where: {id: hall.id}}) 
            res.status(200).send({message: 'Reservation is deleted'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    }
}

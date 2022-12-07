import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'
import TimelinesController from "./controller_timelines";
import authorization from '../authorization/authorizationMiddleware';

class ReservationController {
    public addReservation = async (req, res) => {
        try {
            const { timelineId, chairId } = req.body;
            const { id } = req.user;
            const isREserved = await db.Reservations.findOne({ 
                where :{ timelineId },
                include: [{
                    as: 'chairs',
                    model: db.Chairs,
                    where: { id: chairId }
                }]
            });

            if( isREserved ) {
                return res.status(400).send({message: "Chair is not available", isREserved})
            }
                //@ts-ignore
                await db.Reservations.create( { timelineId, chairId, UserId:id } );
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
            const { id } = req.params;
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

    public getReservationsByFilmId = async(req, res) => {
            try{
                const { id } = req.params;
                const filmExist = await db.Timelines.findAll({ 
                    where:{ 
                        filmId: id
                    },
                    include :[
                        {
                        as:'filmTimelines',
                        model: db.Films,
                        },
                        {
                            as:'hall',
                            model: db.Halls,
                            include:{
                                model: db.Chairs,
                                as: 'hallChairs',
                                required: false,
                            }
                        },
                        {
                            as:'reservations',
                            model: db.Reservations,
                            required: true,
                            include:{
                                model: db.Chairs,
                                as: 'chairs'
                            }
                        }
                ]
                    
                })
                return res.status(200).json(filmExist);
                
            } catch(e) {
                console.log(e);
                res.status(400).send({error: e})           
            }
    }

}

export default ReservationController

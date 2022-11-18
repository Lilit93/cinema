import e, { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'
import pg from "pg";
import sequelize from "sequelize";
const { QueryTypes } = require('sequelize')




class TimelinesController {
    public addTimeline = async (req, res) =>{
        try{
            const {hallId, filmId,started, ended} = req.body;
            const filmIsExsist = await db.Films.findOne({where:{id:filmId}});
            const hallInHallTable = await db.Halls.findOne({where:{id:hallId}});
            if (!hallInHallTable || !filmIsExsist){
                return res.status(400).send({message:"something went wrong"})
            }

            const istimelineExist = await db.Timelines.findAll({
                where: { hallId,
                    [sequelize.Op.or] : [
                        {
                            started: {
                                [sequelize.Op.between]: [started, ended]
                            }
                        },
                        {
                            ended: {
                                [sequelize.Op.between]: [started, ended]
                            }
                        }
                    ]
                            
                }
            })
            if(istimelineExist.length > 0){
                return res.status(400).send({message:"you can't add film on that time "})
            }
             await db.Timelines.create( {hallId, filmId,started, ended} );
             res.status(200).send({message:"Film is successfully added in timeline table"})


        }catch(e){
            res.status(400).send({error: e})
        }
    };
    public getTimelineByHallId = async (req,res) =>{
        try{
            const {hallId} = req.params;
            const timelineByHallId = await db.Timelines.findAll({where:{hallId}, include: [{model: db.Films, as: 'film' }]})
            
            if (timelineByHallId.length <= 0){
                return res.status(400).send({message: "Hall is not registrated in Timeline table"})
            }
            return res.status(200).json(timelineByHallId)


        }catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
        
    };
    public updateTimeline = async (req,res) => {
        try{
            const {id} = req.params;
            const {hallId,filmId, started, ended} = req.body;
            const timelineId = await db.Timelines.findOne({id});
            if ( !timelineId ) {
                return res.status(400).send({message:"wrong ID"})
            }
            const filmIsExsist = await db.Films.findOne({id:filmId});
            const hallInHallTable = await db.Halls.findOne({id:hallId});
            if (!hallInHallTable || !filmIsExsist){
                return res.status(400).send({message:"something went wrong"})
            }
            const istimelineExist = await db.Timelines.findAll({
                where: { hallId,
                    [sequelize.Op.or] : [
                        {
                            started: {
                                [sequelize.Op.between]: [started, ended]
                            }
                        },
                        {
                            ended: {
                                [sequelize.Op.between]: [started, ended]
                            }
                        }
                    ]
                            
                }
            });

            if (istimelineExist.length > 0){
                return res.status(400).send({message:"you can't update film on that time "})
            };

            if (hallId || filmId ||started || ended) {
             await db.Timelines.update( {hallId, filmId, started, ended}, {where :{id} });
             res.status(200).send({message:"you successfully update table"})
            }
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    };

    public deleteTimelineById = async (req,res) => {
        try{
            const {id} =req.params;
            const timelineId = await db.Timelines.findOne(id);
            if(!timelineId) {
                return res.status(400).send({message: "Timeline Id is not found"})
            }
            await db.Timelines.destroy(id);
            res.status(200).send({message: "timeline is deleted"})

        }catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    }

}
export default TimelinesController


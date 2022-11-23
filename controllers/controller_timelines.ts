import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'
import pg from "pg";
import sequelize from "sequelize";
const { QueryTypes } = require('sequelize')




class TimelinesController {
    public addTimeline = async (req, res) =>{
        try{
            const {hallId, filmId,started, ended} = req.body;
            const hallInHallTable = await db.Halls.findOne({where:{id:hallId}});
            const hallInTimlineTable = await db.Timelines.findOne({where:{hallId:hallId}})
            if (!hallInHallTable){
                return res.status(400).send({message:"Hall is not found"})
            }
            const istimelineExist = await db.Timelines.findAll({
                where: {
                    $or: [
                        {
                            started: {
                                $between: [started, ended]
                            }
                        },
                        {
                            ended: {
                                $between: [started, ended]
                            }
                        }
                ]
                }
            })


        }catch(e){
            res.status(400).send({error: e})
        }
    }

}
export default TimelinesController

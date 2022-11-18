import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'

class ChairsController{
    public addTimeline = async (req,res) =>{
       try {
        const { hallid, filmId, started, ended }= req.body
        await db.Chairs.create({hallid, filmId, started, ended});
        


        
        return res.status(200).send({ message: 'Timeline is added' });
       }catch (e){
        console.log(e);
            res.status(400).send({error: e})
       }
    };
}

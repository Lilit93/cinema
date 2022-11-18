
import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'
class HallsController {
    public addHall = async (req, res) => {
        try {
            const { name } = req.body;
            await db.Halls.create( { name } );
            return res.status(200).send({ message: 'Hall is added' });
        } catch (e) {
            console.log(e);
            res.status(400).send({error: e})
        }
    };
    public getAll = async (req, res) => {
        const halls = await db.Halls.findAll();
       return res.status(200).json(halls)

    };


    public updateHall = async (req, res) => {
        try{
            const { id } = req.params;
            const { name } = req.body;
            const hall = await db.Halls.findOne({ 
                where:{ id:id }});
            if(!hall){
                return res.status(400).send({message: 'Hall not found'})
            };
            await db.Halls.update({name}, {where: {id : id}}) 
            res.status(200).send({message: 'Hall is updated'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
            console.log("eeee", e)
        }
    };
        
    public deleteHall = async (req, res) => {
        try{
            const {id} = req.params;
            const hall =await db.Halls.findOne({ where:{ id }});
            if(!hall){
                return res.status(400).send({message: 'Hall not found'})
            }
            await db.Halls.destroy({where: {id: hall.id}}) 
            res.status(200).send({message: 'Hall is deleted'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    }
}
export default HallsController

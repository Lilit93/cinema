import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'

class HallsController {
    public addHall: RequestHandler = async (req, res) => {
        try {
            const { name: any } = req.body;
            await db.Halls.create( { name: any } );
            return res.status(200).send({ message: 'Hall is added' });
        } catch (e) {
            console.log(e);
            res.status(400).send({error: e})
        }
    };
    public getAll : RequestHandler = async (req, res) => {
        const halls = await db.Halls.findAll();
       return res.status(200).json(halls)

    };


    public updateHall : RequestHandler = async (req, res) => {
        try{
            const { id } = req.params;
            const { name: any } = req.body;
            const hall = await db.Halls.findOne({ 
                where:{ id:id }});
            if(!hall){
                return res.status(400).send({message: 'Hall not found'})
            };
            await db.Halls.update({name: any}, {where: {id : id}}) 
            res.status(200).send({message: 'Hall is updated'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
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

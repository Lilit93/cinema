import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'

class ChairsController{
    public addChair = async (req,res) =>{
       try {
        const { hallid, row, chair }= req.body
        await db.Chairs.create({hallid, row, chair});
        return res.status(200).send({ message: 'Chair is added' });
       }catch (e){
        console.log(e);
            res.status(400).send({error: e})
       }
    };
    public getAll = async (req, res) => {
        const Chairs = await db.Chairs.findAll();
       return res.status(200).json(Chairs)
    };
    public deletecChair = async (req, res) => {
        try{
            const {id} = req.params;
            const chair =await db.Chairs.findOne({ where:{ id }});
            if(!chair){
                return res.status(400).send({message: 'Chair is not found'})
            }
            await db.Chairs.destroy({where: {id: id}}) 
            res.status(200).send({message: 'Chair is deleted'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    }
}

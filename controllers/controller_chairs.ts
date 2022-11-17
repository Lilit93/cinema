import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'

class ChairsController {
    public addChair = async (req, res) => {
        try{
        const { id:hallId } = req.params;
        const { row, chair} =req.body;
        const hall  = await db.Halls.findOne({  where:{ id:hallId}});

        if (!hall){
            return res.status(400).send({message: 'Hall not found'})
        }
       const chairNumber = await db.Chairs.create( { hallId, row, chair } );
       return res.status(200).json(chairNumber)

    }catch (e) {
        console.log(e);
        res.status(400).send({error: e})
       } 
    };

    public getAll = async (req, res) => {
        const chairs = await db.Chairs.findAll();
       return res.status(200).json(chairs)
    };

    public findById = async (req,res) => {
        try{
        const { id } = req.params;
        const chairId = await db.Chairs.findOne({where: {id:id}});
        if(!chairId) {
            return res.status(400).send({message: "Chair Id is not found"})
        };
        const chair = await db.Chairs.findOne({where:{id:id},include: [{model: db.Halls, as: 'hall' }]})
        return res.status(200).json(chair)

        } catch (e) {
            res.status(400).send({error: e})
        }
    };

    public deleteChair = async (req, res) => {
        try{
            const { id } = req.params;
        const chairId = await db.Chairs.findOne({where: {id:id}});
        if(!chairId) {
            return res.status(400).send({message: "Chair Id is not found"})
        }
        await db.Chairs.destroy({where :{id:id}});
        return res.status(200).send({message:"chair Id is deleted"})
        } catch (e) {
            res.status(400).send({error: e})
        }
    };


}

export default ChairsController
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
    }
}
export default HallsController

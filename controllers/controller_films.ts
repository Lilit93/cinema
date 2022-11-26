import { Request, Response, RequestHandler } from "express";
import path from 'path';
import db from '../db/models'

class FilmsController {
    public addFilm = async (req, res) => {
        try {
            const { name, price, duration,language, categories } = req.body;
            await db.Films.create( { name ,price, duration, language, categories } );
            return res.status(200).send({ message: 'Film is added' });
        } catch (e) {
            console.log(e);
            res.status(400).send({error: e})
        }
    };

    public getAll = async (req, res) => {
        try{
        const films = await db.Films.findAll();
       return res.status(200).json(films)
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    };

    public updateFilm = async (req, res) => {
        try{
            const { id } = req.params;
            const {name, price, duration,language, categories } = req.body;
            if (name || price || duration || language || categories){
                await db.Films.update( {name, price, duration,language, categories}, {where: {id: id}}) 

                res.status(200).send({message: 'Film is updated'})
                return;
            }
            return res.status(400).send({message: 'Film not found'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    };
        
    public deleteFilm = async (req, res) => {
        try{
            const {id} = req.params;
            const film =await db.Films.findOne({ where:{ id }});
            console.log("film", film)
            if(!film){
                return res.status(400).send({message: 'Film not found'})
            }
            await db.Films.destroy({where: {id: film.id}}) 
            res.status(200).send({message: 'Film is deleted'})
        } catch(e){
            console.log(e);
            res.status(400).send({error: e})
        }
    }
}
export default FilmsController

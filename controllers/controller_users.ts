import { Request, Response, RequestHandler } from "express";
import path from 'path';
import * as bcrypt from 'bcrypt'
import authorization from '../authorization/authorizationMiddleware'
import db from '../db/models'
import { create } from "domain";

class UsersController {

    public signUp = async (req, res) => {
        try{
       const{email, lastName, firstName, password, phone} = req.body;
      
       const salt = await bcrypt.genSalt(10);

       const hashedPassword = await bcrypt.hash(password, salt);
      
       const userExists = await db.Users.findOne({
        where: {
            email,
        }
    })
       
       if (userExists){
        return res.status(400).send({message:'You cannot use this email, somene started using it before you'})
       }

       await db.Users.create({
        email,
        lastName,
        firstName,
        password: hashedPassword,
        phone
       })

       return res.send({message:'You have been registrated'});

    }catch (e) {
        console.log(e);
          res.status(400).send({error: e})
       } 
    }

    public signIn = async (req, res) => {
        try{
            const {email, password} = req.body;
            const user = await db.Users.findOne({
                where: {
                    email
                }
            }) 
            if (!user){
                return res.status(400).send({message:'user does not exist'})
            }
            const math = await bcrypt.compare(password, user.password)

            if(!math){
                return res.status(400).send({message:'invalid password'})
            }
            const token = authorization(user.email)

            return res.status(200).send({message:'You logged in successfully',token})

        }catch (e) {
            console.log(e);
              res.status(400).send({error: e})
    }
}
}

export default UsersController

import jwt from 'jsonwebtoken'
import secret from "./authorizationSecret"

const tokenCheck = (req,res,next) =>{
    try{
        const token = req.headars.authorization.split(' ')[1]
        const decodeData = jwt.verify(token, secret)
        req.user = decodeData
        next()
    }catch(e){
        console.log("wrong token or missing")
        res.status(401).send({message:'wrong token or missing'})
    }
}
export default tokenCheck
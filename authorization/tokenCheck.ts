import jwt from 'jsonwebtoken'
const secret = "shhh"
const tokenCheck = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decodeData = jwt.verify(token,secret)
        req.user = decodeData;
        next()
    }catch(e){
        console.log(e)
        res.status(401).send({message:'invalid token'})
    }
}
export default tokenCheck
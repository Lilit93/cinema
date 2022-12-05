import jwt from 'jsonwebtoken';
const secret = "shhh"

function generateAccessToken(id: number){
    const payload = {
        id
    }
    return jwt.sign(payload,secret,{ expiresIn: "10m" });
}
export default generateAccessToken;
import jwt from 'jsonwebtoken';
import secretToken from "./authorizationSecret"

function generateAccessToken(email: string){
    const payload = {
        email
    }
    return jwt.sign(payload,secretToken.secret,{ expiresIn: "10m" });
}
export default generateAccessToken;
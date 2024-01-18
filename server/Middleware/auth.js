import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.token 
                        || req.body.token 
                        || (req.header("Authorization").slice(7).replace(/^"(.*)"$/, '$1'));
          console.log(token);
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("authdecode= ",decode);
            req.user = decode;
        }
        catch(err) {

            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
            data:token
        });
    }
}

export default auth;
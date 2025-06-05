import jwt, { JwtPayload } from "jsonwebtoken";
import { Request,Response, NextFunction } from "express";

// export const verification =(req:Request,res:Response,next:NextFunction):void=>{
//     const authHeader= req.headers["authorization"];
    
//     if(!authHeader) res.status(401).send("Authentication Required: No token provided")

//     const token= authHeader?authHeader.split(" ")[1]:""

//     if(token===undefined){
//         res.status(401).send("Authentication Required: No token provided")
//     }
//     try{
//         jwt.verify(token,"MY_SECRET_TOKEN",async(error:any,pay:any)=>{
//             if(error){
//                 res.send("Invalid Token")
//             }
//             next()
//         })
//     }catch(err){
//         res.status(401).send("Authentication Required: No token provided")
//     }
// }

export const verification = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(401).send("Authentication Required: No token provided");
        return;
    }

    const token = authHeader.split(" ")[1];//[bearer,adsfasdfas]

    if (!token) {
        res.status(401).send("Authentication Required: Invalid token format");
        return;
    }

    try {
        jwt.verify(token, "MY_SECRET_TOKEN", (error: any, payload: any) => {
            if (error) {
                res.status(403).send("Invalid Token");
                return;
            }
            
            console.log(payload)
            // Optionally attach payload to req here: req.user = payload;
            next(); // Only call next() if no response was already sent
        });
    } catch (err) {
        res.status(401).send("Authentication Required: Token verification failed");
    }
};

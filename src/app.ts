import express, { Request, Response } from 'express';
import prisma from './config/prismaClient';
import { route } from './routes/userRoute';
const app = express();
app.use(express.json());
app.use("/",route)
app.get("/", async (req:Request,res:Response)=>{
    let data= await prisma.profile.findMany()
    res.json({
        data:data
    })
})


export default app

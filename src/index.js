import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectDB } from "./conexionBD.js";
import bovinosRoutes from './routes/prueba.routes.js'


const app = express();
app.use(cors({ origin: 'http://localhost:5173',   credentials: true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


app.use("/crud",bovinosRoutes);


connectDB();
app.listen(4000);
console.log("Servidor en el puerto", 4000);
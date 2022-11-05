import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';

import express from "express";

dbConnect();
// Configuracion del server
const app = express();
app.use(express.json()); // Acepte peticiones de JSON
app.use(cors({ // De que puerto puedo recibir peticiones
    credentials:true,
    origin:["http://localhost:4200"] // Aquí van los puertos que puedo aceptar peticioness
})); // Final de configuracion del server

// http://localhost:5000/api/foods ES MI RUTA PADRE
app.use("/api/foods", foodRouter); // foodRouter, Rutas hijas y controladores
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'))
})

// Puerto en el que va correr mi servidor
// process.env.PORT Asigname el puerto que tengas libre en el HOST
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
}) // Final
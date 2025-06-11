import { Client } from "../Dependencias/dependencias.ts";

export const conexion = await new Client().connect({
    hostname:"localhost",
    username:"root",
    db:"FinanzasPersonales",
    password:"root"
})
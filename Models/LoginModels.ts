import { conexion } from "./conexion.ts";
import {z} from '../Dependencies/dependencias.ts'
import { ZodError } from "https://deno.land/x/zod@v3.24.1/ZodError.ts";


export const iniciarSesion = async (email:string,contraseña:string)=>{
    try {
        const[usuario] = await conexion.query("SELECT * FROM Usuarios WHERE email=?",[email]);
        if (contraseña === usuario.contraseña) {
            return{
                success:true,
                msg:"Sesion iniciada correctamente",
                data:usuario
            }
        }else{
            return{
                success:false,

            }
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return{success:false,msg: error.message}
            
        }else{
            return{success:false,msg:"Error interno del servidor"}
        }
        
    }



}

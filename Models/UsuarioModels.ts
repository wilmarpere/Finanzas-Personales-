// deno-lint-ignore-file
import { conexion } from "../Models/conexion.ts";
import { number } from 'https://deno.land/x/zod@v3.24.1/types.ts';
import{z} from "../Dependencies/dependencias.ts"

interface UsuarioData{
    id_usuario:number| null;
    nombre:string;
    email:string;
    contraseña:string;   
}


export class Usuario{

public _objUsuario: UsuarioData| null;
public _idUsuario:number| null;

constructor(objUsuario:UsuarioData| null=null,idUsuario:number| null = null){
    this._idUsuario= idUsuario;
    this._objUsuario= objUsuario;
}
public async RegistrarUsuario(): Promise<{success:boolean;message:string; usuario?: Record<string,unknown>}>{
    try {
        if (!this._objUsuario) {
            throw new Error("No se ha proporcionado un objeto de tipo usuario valido")
        }
        const {nombre, email,contraseña}= this._objUsuario;
        if (!nombre|| !email|| !contraseña) {
            throw new Error("Faltan campos requeridos para registrar l apeticion ")
        }

        await conexion.execute("START TRANSACTION");
         const result = await conexion.execute("INSERT INTO Usuarios (nombre, email, contraseña) VALUES (?, ?, ?)",[nombre,email,contraseña]);

         if (result && typeof result.affectedRows == "number" && result.affectedRows){
            const[Usuario] = await conexion.query("SELECT * FROM Usuarios WHERE id_usuario = LAST_INSERT_ID()")
            await conexion.execute("COMMIT")
            return{
                success:true,
                message:"Usuario registrado correctamente",
                usuario:Usuario
            }
         }else{
            throw new Error("Error al registrar el usuario")
         }

    } catch (error) {
        if ( error instanceof z.ZodError) {
            return{
                success:false,
                message:error.message
            }
        }else{
            return{
                success:false,
                message:"Error interno del servidor"
            }
        }
        
    }
}



}

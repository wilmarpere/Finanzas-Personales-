
// deno-lint-ignore-file
import { Usuario } from "../Models/UsuarioModels.ts";
import { request } from 'node:http';

export const  postUsuario = async(ctx:any)=>{
    const{response,request}= ctx;
    try {
        const contenido = await request.headers.get("content-type");
        if (contenido === "0") {
            response.status=400;
            response.body={
                success:false,
                msg:"Cuerpo de la solicitud esta vacio"
            }
            return;
        }


        const body = await request.body.json();
        const UsuariosData={
            id_usuario:null,
            nombre:body.nombre, 
            email:body.email,
            contraseña:body.contraseña
        }

        const objUsuario = new Usuario(UsuariosData)
        const result = await objUsuario.RegistrarUsuario();
        response.status=200;
        response.body={
            status:true,
            body:result
        }
    } catch (error)
     {
        response.status= 400;
        response.body={
            status:false,
            msg:"Error al registrar el usuario"
        }
        
    }
}
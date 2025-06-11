// deno-lint-ignore-file
import { CrearToken,VerificarTokenAcceso } from "../helpers/jwt.ts";
import { iniciarSesion } from "../Models/LoginModels.ts";

export const posUserLigin = async (ctx: any)=> {

    const {request,response} = ctx;

    try {
        const contentLength = request.headers.get("Content-Length");
        if (contentLength === "0") {
            response.status= 400;
            response.body={
                success:false,
                msg:"Cuerpo de la solicitud vacio"
            }
             return;
        }

        const body = await request.body.json();
        // validar si tenemos email y contraseña

        if (!body.email || !body.contraseña) {
            response.status= 400;
            response.body={
                success:false,
                msg:"Faltan datos (email o contraseña)"
            }
            return;
        }
        const result = await iniciarSesion(body.email,body.contraseña);

        if (result.success) {
            const token = await CrearToken(result.data.id_usuario)
            response.status=200;
            response.body={
                success:true,
                accessToken: token,
                data : `${result.data.nombre}`,

            };
            
        }else{
            response.status=401;
            response.body={
                success:false,
                msg:"credenciales incorrectas"
            }
        }



       
    } catch (error) {
        response.status=500;
        response.body={success:false,msg:"error interno del servidor"+error}
    }

}
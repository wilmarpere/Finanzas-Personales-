// deno-lint-ignore-file
import { VerificarTokenAcceso } from "../helpers/jwt.ts";
import { Context,Next } from 'https://deno.land/x/oak@v17.1.3/mod.ts';



// middleware para proteger rutas 

export async  function authMiddleware(ctx: Context,next:Next){

    const autHeader = ctx.request.headers.get("Authorization");

    if (!autHeader) {
        ctx.response.status=401;
        ctx.response.body={error:"No autorizado"}
        return;
    }
    
    const token = autHeader.split(" ")[1]
    const usuario = await VerificarTokenAcceso(token)

    if (!usuario) {
        ctx.response.status=401;
        ctx.response.body={error:"Token invalido o expirado"}
    }

    ctx.state.user = usuario;
    await next();
}
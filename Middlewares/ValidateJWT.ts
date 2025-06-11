import { VerificarTokenAcceso } from "../helpers/jwt.ts";
import { Context,Next } from "https://deno.land/x/oak@v17.1.3/mod.ts";


//middleware para proteger rutas
export async function authMiddleware(ctx: Context,next:Next) {


    const authHeader = ctx.request.headers.get("Authorization");

    if (!authHeader) {
        ctx.response.status=401;
        ctx.response.body = { error: "No autorizado" }
        return;
    }

    const token = authHeader.split(" ")[1]
    const usuario = await VerificarTokenAcceso(token)

    if (!usuario) {
        ctx.response.status = 401;
        ctx.response.body = { error: "Tpken invalido expirado" }
    }

    ctx.state.user= usuario;
    await next();


}
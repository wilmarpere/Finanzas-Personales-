import { VerificarTokenAcceso } from "../helpers/jwt.ts";

export const authMiddleware = async (ctx: any, next: () => Promise<unknown>) => {
    const { request, response } = ctx;
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        response.status = 401;
        response.body = { success: false, msg: "Token no proporcionado" };
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = await VerificarTokenAcceso(token);

    if (!payload) {
        response.status = 401;
        response.body = { success: false, msg: "Token inválido o expirado" };
        return;
    }

    ctx.state = { user: payload };
    await next();
};
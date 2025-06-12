import { obtenerTransaccionPorUsuario } from "../Models/transaccion.Models.ts";

export const getTransaccionUsuario = async (ctx: any) =>{
    const { response,state } = ctx;
    const id_usuario = state.user.sub; // El sub de JWT esn el id_usuario

    const result = await obtenerTransaccionPorUsuario(id_usuario);

    if (result.success) {
        response.status = 200;
        response.body = { success:true, transaccion: result.data};

    }else{
        response.status = 500;
        response.body = { success: false, msg: result.msg};
    }
}
import { obtenerCategPorUsers } from "../Models/CategoriaModels.ts";

export const getCategoriaUsuario = async (ctx: any) =>{

    const { response, state} = ctx;
    const { id_usuario } = state.user.sub; // el sub del JWT del idUsuario

    const result = await obtenerCategPorUsers(id_usuario);

    if (result.success) {
        response.status = 200;
        response.body = {success: true, categorias: result.data};
    }else{
        response.status = 500;
        response.body = {success: false, msg: result.msg};
    }







}
// deno-lint-ignore-file
import { Cuentas, obtenerCuentasPorUsuario } from "../Models/cuentasModels.ts";
import { request } from 'node:http';


export const getCuentasUsuario = async(ctx : any)=>{
    const {response,state}= ctx;
    const id_usuario = state.user.sub;// El sub del JWT  es el id_usuario

    const result = await obtenerCuentasPorUsuario(id_usuario);
    if (result.success) {
        response.status= 200;
        response.body = {success: true,Cuentas: result.data}
    }else{
        response.status = 500;
        response.body = {success:false,msg:result.msg}
    }
    
}


export const postCuentas = async(ctx : any)=>{
    const {response,request}=ctx;
    try {
        const contenido = await request.headers.get("Content-type")
        if (contenido == "0") {
            response.status = 400;
            response.body ={
                status:false,
                msg:"Cuerpo de la solicitud esta vacio"
            }
            return;
        }
        const body = await request.body.json();
        const CuentaData={
            id_cuenta:null,
            id_usuario:body.id_usuario,
            nombre:body.nombre,
            tipo:body.tipo,
            saldo:body.saldo
        }

        const objCuenta= new Cuentas(CuentaData);
        const result = await objCuenta.registrarCuentas();
        response.status=200;
        response.body={
            status:true,
            body:result
        }
    } catch (error) {
        response.status=400;
        response.body={
            status:false,
            msg:"Error al registrar la cuenta"
        }
        
    }


}




export const putCuentas = async(ctx : any)=>{

}


export const deleteCuentas = async (ctx:any)=>{

}
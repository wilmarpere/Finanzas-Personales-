import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

type tipoTransaccion = 'Ingreso'| 'Gasto';

interface TransaccionData{
 
    id_transaccion: number | null;
    id_usuario: number ;
    id_cuenta: number;
    id_categoria: number;
    monto: number;
    fecha: Date;
    descripcion:string;
    tipo: tipoTransaccion;
}

export class Transaccion{
    public _objTransaccion: TransaccionData | null;
    public _idTransaccion: number | null;

    constructor(objTransaccion: TransaccionData | null = null,idTransaccion:number | null = null){
        this._idTransaccion = idTransaccion;
        this._objTransaccion = objTransaccion;
    }

    public async listarTransaccion():Promise<TransaccionData[]>{
        const {rows: Transacciones } = await conexion.execute("Select * from transacciones");
        return Transacciones as TransaccionData[];
    }

    public async listarTransaccionPorUsuario(id_usuario:number):Promise<TransaccionData[]>{
        const { rows: Transacciones} = await conexion.execute("Select * from transaccione where id_usuario =?", [id_usuario]);
        return Transacciones as TransaccionData[];
    }

}

export async function obtenerTransaccionPorUsuario(id_usuario:number) 
{

    const transaccion = new Transaccion();
    try {
        const transacciones = await transaccion.listarTransaccionPorUsuario(id_usuario);
        return { success: true,data:transacciones};
    } catch (error) {
        return { success: false,msg: "Error al obtener transacciones"}
        
    }
}
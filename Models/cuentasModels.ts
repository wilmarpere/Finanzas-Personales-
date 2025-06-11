// deno-lint-ignore-file
import { conexion } from "./conexion.ts";
import{z} from "../Dependencies/dependencias.ts"

interface CuentasData {

    id_cuenta:number|null,
    id_usuario:number,
    nombre:string,
    tipo:string,
    saldo:number
}

export class Cuentas{
public _objCuentas:CuentasData|null;
public _idCuentas:number | null


constructor(objCuentas:CuentasData| null=null, idCuentas:number | null=null){
    this._idCuentas=idCuentas;
    this._objCuentas=objCuentas;
}
}